/*
  Warnings:

  - A unique constraint covering the columns `[cartId,productId,variantOptionId]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "CartItem_cartId_productId_key";

-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "variantOptionId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_cartId_productId_variantOptionId_key" ON "CartItem"("cartId", "productId", "variantOptionId");

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_variantOptionId_fkey" FOREIGN KEY ("variantOptionId") REFERENCES "variant_options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
