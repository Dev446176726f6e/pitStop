/*
  Warnings:

  - You are about to alter the column `role_id` on the `admin_role` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `role` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- DropForeignKey
ALTER TABLE "admin_role" DROP CONSTRAINT "admin_role_role_id_fkey";

-- AlterTable
ALTER TABLE "admin_role" ALTER COLUMN "role_id" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "role" DROP CONSTRAINT "role_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ADD CONSTRAINT "role_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "admin_role" ADD CONSTRAINT "admin_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
