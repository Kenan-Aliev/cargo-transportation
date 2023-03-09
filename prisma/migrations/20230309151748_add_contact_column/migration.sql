/*
  Warnings:

  - Added the required column `contact` to the `Contacts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contacts" ADD COLUMN     "contact" TEXT NOT NULL;
