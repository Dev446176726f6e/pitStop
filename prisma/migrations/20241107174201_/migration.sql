/*
  Warnings:

  - A unique constraint covering the columns `[role_id]` on the table `staff_role` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[staff_id]` on the table `staff_role` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "staff_role_role_id_key" ON "staff_role"("role_id");

-- CreateIndex
CREATE UNIQUE INDEX "staff_role_staff_id_key" ON "staff_role"("staff_id");
