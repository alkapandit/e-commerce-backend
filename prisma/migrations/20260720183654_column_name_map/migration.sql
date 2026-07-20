-- AlterTable
ALTER TABLE "addresses" RENAME CONSTRAINT "Address_pkey" TO "addresses_pkey";

-- AlterTable
ALTER TABLE "cart_items" RENAME CONSTRAINT "CartItem_pkey" TO "cart_items_pkey";

-- AlterTable
ALTER TABLE "carts" RENAME CONSTRAINT "Cart_pkey" TO "carts_pkey";

-- AlterTable
ALTER TABLE "categories" RENAME CONSTRAINT "Category_pkey" TO "categories_pkey";

-- RenameForeignKey
ALTER TABLE "addresses" RENAME CONSTRAINT "Address_userId_fkey" TO "addresses_user_id_fkey";

-- RenameForeignKey
ALTER TABLE "cart_items" RENAME CONSTRAINT "CartItem_cartId_fkey" TO "cart_items_cart_id_fkey";

-- RenameForeignKey
ALTER TABLE "cart_items" RENAME CONSTRAINT "CartItem_productId_fkey" TO "cart_items_product_id_fkey";

-- RenameForeignKey
ALTER TABLE "cart_items" RENAME CONSTRAINT "CartItem_variantOptionId_fkey" TO "cart_items_variant_option_id_fkey";

-- RenameForeignKey
ALTER TABLE "carts" RENAME CONSTRAINT "Cart_userId_fkey" TO "carts_user_id_fkey";

-- RenameForeignKey
ALTER TABLE "order_items" RENAME CONSTRAINT "order_items_orderId_fkey" TO "order_items_order_id_fkey";

-- RenameForeignKey
ALTER TABLE "order_items" RENAME CONSTRAINT "order_items_productId_fkey" TO "order_items_product_id_fkey";

-- RenameForeignKey
ALTER TABLE "orders" RENAME CONSTRAINT "orders_addressId_fkey" TO "orders_address_id_fkey";

-- RenameForeignKey
ALTER TABLE "orders" RENAME CONSTRAINT "orders_buyerId_fkey" TO "orders_buyer_id_fkey";

-- RenameForeignKey
ALTER TABLE "payments" RENAME CONSTRAINT "payments_orderId_fkey" TO "payments_order_id_fkey";

-- RenameForeignKey
ALTER TABLE "product_variants" RENAME CONSTRAINT "product_variants_productId_fkey" TO "product_variants_product_id_fkey";

-- RenameForeignKey
ALTER TABLE "products" RENAME CONSTRAINT "products_categoryId_fkey" TO "products_category_id_fkey";

-- RenameForeignKey
ALTER TABLE "products" RENAME CONSTRAINT "products_sellerId_fkey" TO "products_seller_id_fkey";

-- RenameForeignKey
ALTER TABLE "variant_options" RENAME CONSTRAINT "variant_options_variantId_fkey" TO "variant_options_variant_id_fkey";

-- RenameIndex
ALTER INDEX "Address_userId_idx" RENAME TO "addresses_user_id_idx";

-- RenameIndex
ALTER INDEX "CartItem_cartId_productId_variantOptionId_key" RENAME TO "cart_items_cart_id_product_id_variant_option_id_key";

-- RenameIndex
ALTER INDEX "Cart_userId_key" RENAME TO "carts_user_id_key";

-- RenameIndex
ALTER INDEX "payments_orderId_key" RENAME TO "payments_order_id_key";

-- RenameIndex
ALTER INDEX "payments_transactionId_key" RENAME TO "payments_transaction_id_key";
