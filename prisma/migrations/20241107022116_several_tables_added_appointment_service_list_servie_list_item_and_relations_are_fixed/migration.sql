/*
  Warnings:

  - You are about to drop the column `appointment_id` on the `basket` table. All the data in the column will be lost.
  - You are about to drop the column `appointment_id` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `staff_id` on the `work_graphic` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[work_scheduele_id]` on the table `staff` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Appointment_Status" AS ENUM ('SCHEDULED', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW', 'RESCHEDULED', 'PENDING', 'FAILED', 'EXPIRED');

-- AlterTable
ALTER TABLE "basket" DROP COLUMN "appointment_id";

-- AlterTable
ALTER TABLE "payment" DROP COLUMN "appointment_id",
ADD COLUMN     "appointmentId" INTEGER;

-- AlterTable
ALTER TABLE "staff" ALTER COLUMN "is_active" DROP NOT NULL;

-- AlterTable
ALTER TABLE "work_graphic" DROP COLUMN "staff_id";

-- CreateTable
CREATE TABLE "appointment" (
    "id" SERIAL NOT NULL,
    "client_id" INTEGER,
    "car_id" INTEGER,
    "service_list_id" INTEGER,
    "basket_id" INTEGER,
    "payment_id" INTEGER,
    "status" "Appointment_Status" NOT NULL DEFAULT 'SCHEDULED',

    CONSTRAINT "appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service-list" (
    "id" SERIAL NOT NULL,
    "total_price" DECIMAL(15,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service-list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service-list-item" (
    "id" SERIAL NOT NULL,
    "service_list_id" INTEGER NOT NULL,
    "service_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service-list-item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "appointment_service_list_id_key" ON "appointment"("service_list_id");

-- CreateIndex
CREATE UNIQUE INDEX "appointment_basket_id_key" ON "appointment"("basket_id");

-- CreateIndex
CREATE UNIQUE INDEX "appointment_payment_id_key" ON "appointment"("payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "service-list_id_key" ON "service-list"("id");

-- CreateIndex
CREATE UNIQUE INDEX "staff_work_scheduele_id_key" ON "staff"("work_scheduele_id");

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_service_list_id_fkey" FOREIGN KEY ("service_list_id") REFERENCES "service-list"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_basket_id_fkey" FOREIGN KEY ("basket_id") REFERENCES "basket"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_work_scheduele_id_fkey" FOREIGN KEY ("work_scheduele_id") REFERENCES "work_graphic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
