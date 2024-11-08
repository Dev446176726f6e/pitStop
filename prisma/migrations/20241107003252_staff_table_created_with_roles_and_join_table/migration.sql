-- CreateEnum
CREATE TYPE "Staff_Status" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED', 'TERMINATED', 'ON_LEAVE');

-- CreateTable
CREATE TABLE "staff" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "hashed_password" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL,
    "department_id" INTEGER NOT NULL,
    "employement_date" TEXT NOT NULL,
    "work_scheduele_id" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "status" "Staff_Status" NOT NULL DEFAULT 'ACTIVE',
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staff_role" (
    "id" SERIAL NOT NULL,
    "role_id" INTEGER NOT NULL,
    "staff_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "staff_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_s" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "role_s_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "department_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "staff_role_role_id_staff_id_key" ON "staff_role"("role_id", "staff_id");

-- CreateIndex
CREATE UNIQUE INDEX "role_s_name_key" ON "role_s"("name");

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff_role" ADD CONSTRAINT "staff_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role_s"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff_role" ADD CONSTRAINT "staff_role_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
