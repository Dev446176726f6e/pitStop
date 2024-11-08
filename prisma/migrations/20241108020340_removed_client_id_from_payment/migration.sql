/*
  Warnings:

  - You are about to drop the column `client_id` on the `payment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_client_id_fkey";

-- AlterTable
ALTER TABLE "payment" DROP COLUMN "client_id";
