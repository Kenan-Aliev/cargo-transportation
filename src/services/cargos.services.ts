import { PrismaClient } from "@prisma/client";
import { ApiError } from "../utils";
import bcrypt from "bcrypt";
import randomstring from "randomstring";
import { SendMail } from "../utils";
import { Cargo } from "../interfaces/Cargo";

const prisma = new PrismaClient();

class CargosServices {
  async create(authorID: number, data: Cargo) {
    const cargo = await prisma.cargo.create({
      data: {
        ...data,
        authorId: authorID,
        contacts: {
          create: data.contacts.map((contact) => {
            return { contact: contact };
          }),
        },
      },
    });
    return cargo;
  }

  async getList() {
    const cargos = await prisma.cargo.findMany({
      include: {
        contacts: {
          select: {
            id: true,
            contact: true,
          },
        },
        author: {
          select: {
            name: true,
            surname: true,
            email: true,
            phone: true,
          },
        },
      },
    });
    return cargos;
  }

  async getUserCargos(userId: number) {
    const cargos = await prisma.cargo.findMany({
      where: {
        authorId: userId,
      },
      include: {
        contacts: {
          select: {
            id: true,
            contact: true,
          },
        },
      },
    });
    return cargos;
  }
}

export default new CargosServices();
