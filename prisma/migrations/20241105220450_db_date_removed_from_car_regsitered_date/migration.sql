-- AlterTable
ALTER TABLE "car" ALTER COLUMN "registered_date" SET DATA TYPE TIMESTAMP(3);

-- CreateTable
CREATE TABLE "client" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);
