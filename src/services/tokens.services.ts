import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class TokensServices {
  async findToken(token: string) {
    const response = await prisma.tokens.findFirst({
      where: {
        token,
      },
    });
    return response !== null;
  }

  async create(userID: number, token: string) {
    await prisma.tokens.create({
      data: {
        token,
        userId: userID,
      },
    });
  }

  async delete(userID: number) {
    const deleted = await prisma.tokens.delete({
      where: {
        userId: userID,
      },
    });
    return deleted;
  }
}

export default new TokensServices();
