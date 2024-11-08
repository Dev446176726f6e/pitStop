/*
  Warnings:

  - The `location` column on the `service-center` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `email` on table `service-center` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "service-center" DROP COLUMN "location",
ADD COLUMN     "location" INTEGER[],
ALTER COLUMN "email" SET NOT NULL;
