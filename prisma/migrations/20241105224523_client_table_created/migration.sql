/*
  Warnings:

  - Added the required column `first_name` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `client` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Client_Status" AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING', 'SUSPENDED', 'BANNED', 'VERIFIED', 'UNVERIFIED', 'ARCHIVED', 'DELETED', 'LOCKED', 'EXPIRED', 'TRIAL', 'REACTIVATED', 'DEACTIVATED');

-- AlterTable
ALTER TABLE "client" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "hashed_password" TEXT,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "phone_number" TEXT NOT NULL,
ADD COLUMN     "status" "Client_Status" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "token" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
