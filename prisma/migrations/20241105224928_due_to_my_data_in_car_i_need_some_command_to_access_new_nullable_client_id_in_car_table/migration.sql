/*
  Warnings:

  - Added the required column `client_id` to the `car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "car" ADD COLUMN     "client_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
