-- DropForeignKey
ALTER TABLE "Cargo" DROP CONSTRAINT "Cargo_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Contacts" DROP CONSTRAINT "Contacts_cargoId_fkey";

-- AddForeignKey
ALTER TABLE "Cargo" ADD CONSTRAINT "Cargo_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contacts" ADD CONSTRAINT "Contacts_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
