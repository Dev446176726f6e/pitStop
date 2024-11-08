-- CreateEnum
CREATE TYPE "Car_Status" AS ENUM ('ACTIVE', 'INACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "Transmission_Type" AS ENUM ('manual', 'automatic', 'electric');

-- CreateEnum
CREATE TYPE "Engine_Type" AS ENUM ('petrol', 'turbocharged_petrol', 'supercharged_petrol', 'diesel', 'turbocharged_diesel', 'supercharged_diesel', 'rotary', 'electric', 'hybrid_petrol_electric', 'hybrid_diesel_electric', 'plug_in_hybrid', 'natural_gas', 'propane');

-- CreateEnum
CREATE TYPE "Body_Type" AS ENUM ('Sedan', 'Hatchback', 'SUV', 'Coupe', 'Convertible', 'Wagon', 'Pickup', 'Minivan', 'Van', 'Crossover', 'Motorcycle', 'SportsCar');

-- CreateTable
CREATE TABLE "car" (
    "id" SERIAL NOT NULL,
    "manufacturer" VARCHAR(50) NOT NULL,
    "model" VARCHAR(50) NOT NULL,
    "year" INTEGER,
    "VIN" VARCHAR(50),
    "license_plate" VARCHAR(20),
    "color" VARCHAR(30),
    "registered_date" DATE NOT NULL,
    "engine_type" "Engine_Type" NOT NULL,
    "transmission" "Transmission_Type" NOT NULL,
    "mileage" INTEGER NOT NULL,
    "body_type" "Body_Type" NOT NULL,
    "insurance_details" TEXT,
    "status" "Car_Status" NOT NULL DEFAULT 'ACTIVE',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "car_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "car_VIN_license_plate_key" ON "car"("VIN", "license_plate");
