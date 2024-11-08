-- CreateTable
CREATE TABLE "basket" (
    "id" SERIAL NOT NULL,
    "appointment_id" INTEGER NOT NULL,
    "total_price" DECIMAL(15,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "basket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "basket_item" (
    "id" SERIAL NOT NULL,
    "basket_id" INTEGER NOT NULL,
    "parts_and_products_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "basket_item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "basket_item" ADD CONSTRAINT "basket_item_basket_id_fkey" FOREIGN KEY ("basket_id") REFERENCES "basket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "basket_item" ADD CONSTRAINT "basket_item_parts_and_products_id_fkey" FOREIGN KEY ("parts_and_products_id") REFERENCES "parts_and_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
