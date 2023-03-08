import { PrismaClient } from "@prisma/client";
import { User } from "../interfaces/User";
import { ApiError } from "../utils";
import bcrypt from "bcrypt";

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
    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        phone: data.phone,
        surname: data.surname,
        password: hashedPass,
        telegram: data.telegram,
        whatsapp: data.whatsapp,
      },
    });
    return newUser;
  }
}

export default new UsersServices();
