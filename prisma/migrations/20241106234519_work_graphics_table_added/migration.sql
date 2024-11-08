-- CreateEnum
CREATE TYPE "WorkTime" AS ENUM ('FULL_TIME', 'PART_TIME', 'ON_CALL', 'FLEXIBLE');

-- CreateTable
CREATE TABLE "work_graphic" (
    "id" SERIAL NOT NULL,
    "staff_id" INTEGER NOT NULL,
    "default_start_time" TEXT NOT NULL DEFAULT '09:00',
    "default_end_time" TEXT NOT NULL DEFAULT '17:00',
    "work_days" JSON NOT NULL,
    "work_time" "WorkTime" NOT NULL DEFAULT 'FULL_TIME',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "work_graphic_pkey" PRIMARY KEY ("id")
);
