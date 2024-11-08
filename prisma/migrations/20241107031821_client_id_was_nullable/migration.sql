/*
  Warnings:

  - Made the column `client_id` on table `appointment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "appointment" ALTER COLUMN "client_id" SET NOT NULL;
