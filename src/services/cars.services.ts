import { PrismaClient } from "@prisma/client";
import { Car, EditCar } from "../interfaces/Car";
import { ApiError } from "../utils";

const prisma = new PrismaClient();

class CarsServices {
  async create(authorID: number, data: Car) {
    const car = await prisma.car.create({
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
    return car;
  }

  async edit(cargoId: number, data: EditCar) {
    const updated = await prisma.car.update({
      where: {
        id: cargoId,
      },
      data: {
        ...data,
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

  async getList(
    from: string,
    to: string,
    date: string,
    limit: number,
    page: number
  ) {
    const offset = page * limit - limit;
    let filter = {};
    if (from) {
      filter = { ...filter, from: { contains: from } };
    }

    if (to) {
      filter = {
        ...filter,
        to: { contains: to },
      };
    }
    if (date) {
      filter = {
        ...filter,
        shipmentDate: {
          gte: new Date(date).toISOString(),
        },
      };
    }
    const cars = await prisma.car.findMany({
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
      skip: offset,
      take: limit,
    });
    return cars;
  }

  async getUserCars(userId: number) {
    const cars = await prisma.car.findMany({
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
    return cars;
  }

  async getCarById(id: number) {
    const car = await prisma.car.findFirst({
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
    return car;
  }

  async deleteCarById(id: number, userId: number) {
    const deleted = await prisma.car.deleteMany({
      where: {
        id: id,
        authorId: userId,
      },
    });
    if (deleted.count > 0) {
      return { message: "???? ?????????????? ?????????????? ????????????" };
    }
    throw ApiError.ClientError(
      "???? ?????????????? ?????????????? ????????????, ???????????????? ?????????? ???????????? ?????? ?????? ???? ?????????????????? ?????????????? ?????????? ????????????"
    );
  }
}

export default new CarsServices();
