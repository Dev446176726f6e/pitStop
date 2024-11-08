/*
  Warnings:

  - You are about to drop the column `appointmentId` on the `payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "payment" DROP COLUMN "appointmentId",
ALTER COLUMN "promocode" DROP NOT NULL;
