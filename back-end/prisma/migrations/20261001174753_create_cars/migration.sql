-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "year_manufacture" INTEGER NOT NULL,
    "imported" BOOLEAN NOT NULL,
    "plates" TEXT NOT NULL,
    "selling_date" TIMESTAMP(3),
    "selling_price" DECIMAL(65,30),
    "customer_id" INTEGER,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
