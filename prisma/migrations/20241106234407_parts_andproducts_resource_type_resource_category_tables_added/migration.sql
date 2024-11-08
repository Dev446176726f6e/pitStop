-- CreateEnum
CREATE TYPE "Appointment_Status" AS ENUM ('SCHEDUELED');

-- CreateTable
CREATE TABLE "parts_and_products" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "price" DECIMAL(15,2) NOT NULL,
    "stock_quantity" INTEGER NOT NULL,
    "resource_type_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parts_and_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resource_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "resource_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resource_category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "parent_category_id" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "resource_category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "resource_type_name_key" ON "resource_type"("name");

-- AddForeignKey
ALTER TABLE "parts_and_products" ADD CONSTRAINT "parts_and_products_resource_type_id_fkey" FOREIGN KEY ("resource_type_id") REFERENCES "resource_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parts_and_products" ADD CONSTRAINT "parts_and_products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "resource_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource_category" ADD CONSTRAINT "resource_category_parent_category_id_fkey" FOREIGN KEY ("parent_category_id") REFERENCES "resource_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
