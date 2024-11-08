/*
  Warnings:

  - You are about to drop the column `serviceCenterId` on the `branch` table. All the data in the column will be lost.
  - Added the required column `service_center_id` to the `branch` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "branch" DROP CONSTRAINT "branch_serviceCenterId_fkey";

-- AlterTable
ALTER TABLE "branch" DROP COLUMN "serviceCenterId",
ADD COLUMN     "service_center_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "branch" ADD CONSTRAINT "branch_service_center_id_fkey" FOREIGN KEY ("service_center_id") REFERENCES "service-center"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
