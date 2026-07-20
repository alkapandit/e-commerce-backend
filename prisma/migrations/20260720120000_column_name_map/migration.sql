-- Rename tables to snake_case
ALTER TABLE "Address" RENAME TO "addresses";
ALTER TABLE "Cart" RENAME TO "carts";
ALTER TABLE "CartItem" RENAME TO "cart_items";
ALTER TABLE "Category" RENAME TO "categories";

-- addresses columns
ALTER TABLE "addresses" RENAME COLUMN "userId" TO "user_id";
ALTER TABLE "addresses" RENAME COLUMN "addressLine1" TO "address_line_1";
ALTER TABLE "addresses" RENAME COLUMN "addressLine2" TO "address_line_2";
ALTER TABLE "addresses" RENAME COLUMN "isDefault" TO "is_default";
ALTER TABLE "addresses" RENAME COLUMN "createdAt" TO "created_at";
ALTER TABLE "addresses" RENAME COLUMN "updatedAt" TO "updated_at";

-- carts columns
ALTER TABLE "carts" RENAME COLUMN "userId" TO "user_id";
ALTER TABLE "carts" RENAME COLUMN "createdAt" TO "created_at";
ALTER TABLE "carts" RENAME COLUMN "updatedAt" TO "updated_at";

-- cart_items columns
ALTER TABLE "cart_items" RENAME COLUMN "cartId" TO "cart_id";
ALTER TABLE "cart_items" RENAME COLUMN "productId" TO "product_id";
ALTER TABLE "cart_items" RENAME COLUMN "variantOptionId" TO "variant_option_id";
ALTER TABLE "cart_items" RENAME COLUMN "createdAt" TO "created_at";
ALTER TABLE "cart_items" RENAME COLUMN "updatedAt" TO "updated_at";

-- products columns
ALTER TABLE "products" RENAME COLUMN "sellerId" TO "seller_id";
ALTER TABLE "products" RENAME COLUMN "discountPrice" TO "discount_price";
ALTER TABLE "products" RENAME COLUMN "isActive" TO "is_active";
ALTER TABLE "products" RENAME COLUMN "isFeatured" TO "is_featured";
ALTER TABLE "products" RENAME COLUMN "categoryId" TO "category_id";
ALTER TABLE "products" RENAME COLUMN "subCategoryId" TO "sub_category_id";
ALTER TABLE "products" RENAME COLUMN "createdAt" TO "created_at";
ALTER TABLE "products" RENAME COLUMN "updatedAt" TO "updated_at";

-- product_variants columns
ALTER TABLE "product_variants" RENAME COLUMN "productId" TO "product_id";

-- variant_options columns
ALTER TABLE "variant_options" RENAME COLUMN "variantId" TO "variant_id";

-- orders columns
ALTER TABLE "orders" RENAME COLUMN "buyerId" TO "buyer_id";
ALTER TABLE "orders" RENAME COLUMN "totalAmount" TO "total_amount";
ALTER TABLE "orders" RENAME COLUMN "addressId" TO "address_id";

-- order_items columns
ALTER TABLE "order_items" RENAME COLUMN "orderId" TO "order_id";
ALTER TABLE "order_items" RENAME COLUMN "productId" TO "product_id";

-- payments columns
ALTER TABLE "payments" RENAME COLUMN "orderId" TO "order_id";
ALTER TABLE "payments" RENAME COLUMN "transactionId" TO "transaction_id";
ALTER TABLE "payments" RENAME COLUMN "createdAt" TO "created_at";
ALTER TABLE "payments" RENAME COLUMN "updatedAt" TO "updated_at";

-- users columns
ALTER TABLE "users" RENAME COLUMN "refreshToken" TO "refresh_token";
ALTER TABLE "users" RENAME COLUMN "firstName" TO "first_name";
ALTER TABLE "users" RENAME COLUMN "lastName" TO "last_name";
