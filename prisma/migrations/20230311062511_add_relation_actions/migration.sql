-- DropForeignKey
ALTER TABLE "Contacts" DROP CONSTRAINT "Contacts_carId_fkey";

-- AddForeignKey
ALTER TABLE "Contacts" ADD CONSTRAINT "Contacts_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;
