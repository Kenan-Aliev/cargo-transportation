-- CreateTable
CREATE TABLE "Cargo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "volume" TEXT NOT NULL,
    "transportType" TEXT NOT NULL,
    "shipmentDate" TIMESTAMP(3) NOT NULL,
    "price" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Cargo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contacts" (
    "id" SERIAL NOT NULL,
    "cargoId" INTEGER NOT NULL,

    CONSTRAINT "Contacts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cargo" ADD CONSTRAINT "Cargo_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contacts" ADD CONSTRAINT "Contacts_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
