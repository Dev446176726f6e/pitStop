/*
  Warnings:

  - You are about to drop the column `is_active` on the `Service` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Service_Status" AS ENUM ('AVAILABLE', 'UNAVAILABLE', 'NO_MASTERS', 'CLOSED', 'BANNED', 'IN_MAINTENANCE', 'PENDING');

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "is_active",
ADD COLUMN     "status" "Service_Status" NOT NULL DEFAULT 'AVAILABLE';
