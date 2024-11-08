/*
  Warnings:

  - A unique constraint covering the columns `[email,phone_number]` on the table `client` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "client_email_phone_number_key" ON "client"("email", "phone_number");
