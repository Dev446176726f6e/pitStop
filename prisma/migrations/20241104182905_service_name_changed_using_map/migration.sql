/*
  Warnings:

  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_category_id_fkey";

-- DropTable
DROP TABLE "Service";

-- CreateTable
CREATE TABLE "service" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category_id" INTEGER NOT NULL,
    "average_duration" TEXT,
    "price" DECIMAL(14,2) NOT NULL,
    "status" "Service_Status" DEFAULT 'AVAILABLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "service_name_key" ON "service"("name");

-- AddForeignKey
ALTER TABLE "service" ADD CONSTRAINT "service_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "service-category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
