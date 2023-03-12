import { PrismaClient } from "@prisma/client";
import { Cargo, EditCargo } from "../interfaces/Cargo";
import { ApiError } from "../utils";

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

  async edit(cargoId: number, data: EditCargo) {
    const updated = await prisma.cargo.update({
      where: {
        id: cargoId,
      },
      data: {
        ...data,
        placementDate: undefined,
        contacts: {
          deleteMany: {
            id: {
              in: data.contacts.map((contact) => {
                return contact.id;
              }),
            },
          },
          createMany: {
            data: data.contacts,
          },
        },
      },
    });

    return updated;
  }

  async getList(city: string, startDate: string, endDate: string) {
    let filter = {};
    if (city) {
      filter = { ...filter, to: { contains: city } };
    }

    if (startDate && !endDate) {
      filter = {
        ...filter,
        shipmentDate: { gte: new Date(startDate).toISOString() },
      };
    } else if (startDate && endDate) {
      filter = {
        ...filter,
        shipmentDate: {
          gte: new Date(startDate).toISOString(),
          lte: new Date(endDate).toISOString(),
        },
      };
    }
    const cargos = await prisma.cargo.findMany({
      where: {
        ...filter,
      },
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

  async getCargoById(id: number) {
    const cargo = await prisma.cargo.findFirst({
      where: {
        id: id,
      },
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
    return cargo;
  }

  async deleteCargoById(id: number, userId: number) {
    const deleted = await prisma.cargo.deleteMany({
      where: {
        id: id,
        authorId: userId,
      },
    });
    if (deleted.count > 0) {
      return { message: "Вы успешно удалили груз" };
    }
    throw ApiError.ClientError(
      "Не удалось удалить груз, возможно такого груза нет или вы пытаетесь удалить чужой груз"
    );
  }
}

export default new CargosServices();
