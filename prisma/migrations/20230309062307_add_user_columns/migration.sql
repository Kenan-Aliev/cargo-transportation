-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activationCode" TEXT,
ADD COLUMN     "isActivated" BOOLEAN NOT NULL DEFAULT false;
