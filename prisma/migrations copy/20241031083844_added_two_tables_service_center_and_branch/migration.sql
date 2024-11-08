-- CreateTable
CREATE TABLE "service-center" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "address" TEXT NOT NULL,
    "location" JSONB NOT NULL,
    "contact_number" TEXT NOT NULL,
    "email" TEXT,
    "description" TEXT,
    "website" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "service-center_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "branch" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "address" TEXT NOT NULL,
    "location" JSONB NOT NULL,
    "contact_number" TEXT NOT NULL,
    "email" TEXT,
    "operating_hours" TEXT[],
    "manager_id" INTEGER,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "serviceCenterId" INTEGER NOT NULL,

    CONSTRAINT "branch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "service-center_email_key" ON "service-center"("email");

-- AddForeignKey
ALTER TABLE "branch" ADD CONSTRAINT "branch_serviceCenterId_fkey" FOREIGN KEY ("serviceCenterId") REFERENCES "service-center"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
