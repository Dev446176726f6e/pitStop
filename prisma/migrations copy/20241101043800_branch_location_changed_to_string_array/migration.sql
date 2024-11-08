/*
  Warnings:

  - The `location` column on the `branch` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "branch" DROP COLUMN "location",
ADD COLUMN     "location" DOUBLE PRECISION[];
