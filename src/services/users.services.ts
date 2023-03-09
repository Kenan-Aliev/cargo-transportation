import { PrismaClient } from "@prisma/client";
import { LoginRequest, MyToken, User } from "../interfaces/Auth";
import { ApiError, Token } from "../utils";
import bcrypt from "bcrypt";
import randomstring from "randomstring";
import { SendMail } from "../utils";

const prisma = new PrismaClient();

class UsersServices {
  async signUp(data: User) {
    const candidate = await prisma.user.findFirst({
      where: { email: data.email },
    });
    if (candidate !== null) {
      throw ApiError.ClientError("Пользователь с таким email уже сущеcтвует");
    }
    const hashedPass = await bcrypt.hash(data.password, 8);
    const activationCode = randomstring
      .generate({
        length: 6,
        charset: "alphanumeric",
      })
      .toUpperCase();
    await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        phone: data.phone,
        surname: data.surname,
        password: hashedPass,
        activationCode: activationCode,
        telegram: data.telegram,
        whatsapp: data.whatsapp,
      },
    });
    const sendMail = new SendMail(data.email, activationCode);
    await sendMail.sendEmail();
    return {
      message:
        "На вашу почту отправлено сообщение для подтверждения вашего аккаунта",
    };
  }

  async login(data: LoginRequest) {
    const user = await prisma.user.findFirst({ where: { email: data.email } });
    if (!user) {
      throw ApiError.ClientError("Пользователя с таким email не существует");
    }
    const isPassValid = await bcrypt.compare(data.password, user.password);
    if (!isPassValid) {
      throw ApiError.ClientError("Введите верный пароль");
    }
    if (!user.isActivated) {
      throw ApiError.Forbidden(
        "Для входа в аккаунт вы должны активировать его"
      );
    }
    const token = Token.encrypt(user.id, user.email);
    return { token };
  }

  async activate(activationCode: string) {
    const user = await prisma.user.findFirst({
      where: { activationCode: activationCode },
    });
    if (!user) {
      throw ApiError.ClientError("Такого кода активации не существует");
    }
    user.isActivated = true;
    user.activationCode = "";
    await prisma.user.update({
      where: { id: user.id },
      data: user,
    });
    return { message: "Вы успешно активировали свой аккаунт" };
  }

  async getUserProfile(data: MyToken) {
    const user = await prisma.user.findFirst({ where: { id: data.id } });
    return {
      email: user?.email,
      name: user?.name,
      surname: user?.surname,
      phone: user?.phone,
      whatsapp: user?.whatsapp,
      telegram: user?.telegram,
    };
  }
}

export default new UsersServices();
