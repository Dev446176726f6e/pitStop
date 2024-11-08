/*
  Warnings:

  - You are about to alter the column `price` on the `Service` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(14,2)`.

*/
-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "average_duration" DROP NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(14,2);
