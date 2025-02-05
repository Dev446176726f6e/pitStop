/*
  Warnings:

  - A unique constraint covering the columns `[admin_id,role_id]` on the table `admin_role` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "admin" ALTER COLUMN "is_deleted" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "admin_role_admin_id_role_id_key" ON "admin_role"("admin_id", "role_id");
