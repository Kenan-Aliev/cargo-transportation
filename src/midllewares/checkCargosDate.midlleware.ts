import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export const checkCargosPlacementDate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const now = new Date();
  now.setMonth(now.getMonth() - 1);
  await prisma.cargo.deleteMany({
    where: {
      placementDate: {
        lte: now.toISOString(),
      },
    },
  });
  next();
};
