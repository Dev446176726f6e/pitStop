-- CreateTable
CREATE TABLE "supplier" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "contact_name" VARCHAR(50),
    "phone_number" VARCHAR(15) NOT NULL,
    "email" VARCHAR(50),
    "address" TEXT,
    "website_url" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "supplier_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "supplier_email_key" ON "supplier"("email");
