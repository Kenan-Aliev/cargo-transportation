import { PrismaClient } from "@prisma/client";
import { Car } from "../interfaces/Car";
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

  async getList(from: string, to: string, date: string) {
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
      return { message: "Вы успешно удалили машину" };
    }
    throw ApiError.ClientError(
      "Не удалось удалить машину, возможно такой маишны нет или вы пытаетесь удалить чужую машину"
    );
  }
}

export default new CarsServices();
