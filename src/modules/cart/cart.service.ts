import prisma from "../../common/config/prisma";
import { ApiError } from "../../common/utils/apiError.util";
import { AddCartItemInput } from "./cart.types";
import { updateCartItemSchema } from "./cart.validation";

export const getAllCartList = async (userid: number) => {
  const result = await prisma.cart.findMany({
    where: { userId: userid },
  });

  if (!result) {
    throw new ApiError(404, "No cart item found!");
  }

  return result;
};

export const getCartDetails = async (cartId: string) => {
  const result = await prisma.cart.findMany({
    where: { id: Number(cartId) },
  });

  if (!result) {
    throw new ApiError(404, "No cart item found!");
  }

  return result;
};

export const addCartItem = async (userId: number, data: AddCartItemInput) => {
  const { productId, quantity, variantOptionId } = data;

  if (quantity < 1) {
    throw new ApiError(400, "Quantity must be at least 1");
  }

  return prisma.$transaction(async (tx) => {
    const product = await tx.product.findUnique({ where: { id: productId } });
    if (!product || !product.isActive) {
      throw new ApiError(404, "Product not found");
    }

    if (product.stock < quantity) {
      throw new ApiError(400, "Insufficient stock");
    }

    const cart = await tx.cart.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    const cartItem = await tx.cartItem.upsert({
      where: {
        cartId_productId_variantOptionId: {
          cartId: cart.id,
          productId,
          variantOptionId: variantOptionId ?? 0,
        },
      },
      create: {
        cartId: cart.id,
        productId,
        variantOptionId,
        quantity,
      },
      update: {
        quantity: { increment: quantity },
      },
    });

    return cartItem;
  });
};

export const updateCartItem = async (
  userId: number,
  cartItemIdParam: string,
  body: unknown,
) => {
  // 1. Validate the id param
  const cartItemId = Number(cartItemIdParam);
  if (!Number.isInteger(cartItemId) || cartItemId <= 0) {
    throw new ApiError(400, "Invalid cart item id");
  }

  // 2. Validate the body
  const { quantity, variantOptionId } = updateCartItemSchema.parse(body);

  return prisma.$transaction(async (tx) => {
    const cartItem = await tx.cartItem.findUnique({
      where: { id: cartItemId },
      include: { cart: true, product: true },
    });

    // 3. Item must exist
    if (!cartItem) {
      throw new ApiError(404, "Cart item not found");
    }

    // 4. Ownership check
    if (cartItem.cart.userId !== userId) {
      throw new ApiError(403, "You do not have access to this cart item");
    }

    // 5. quantity 0 means remove the item
    if (quantity === 0) {
      await tx.cartItem.delete({ where: { id: cartItemId } });
      return { removed: true, cartItemId };
    }

    // 6. Product must still be active
    if (!cartItem.product.isActive) {
      throw new ApiError(400, "This product is no longer available");
    }

    const newVariantId =
      variantOptionId !== undefined
        ? variantOptionId
        : cartItem.variantOptionId;

    // 7. If a variant is set, validate it belongs to this product and check its stock
    let availableStock = cartItem.product.stock;

    if (newVariantId) {
      const variant = await tx.variantOption.findUnique({
        where: { id: newVariantId },
        include: { variant: true },
      });

      if (!variant || variant.variant.productId !== cartItem.productId) {
        throw new ApiError(400, "Invalid variant for this product");
      }

      availableStock = variant.stock ?? availableStock;
    }

    // 8. Stock check
    if (availableStock < quantity) {
      throw new ApiError(400, `Only ${availableStock} unit(s) left in stock`);
    }

    // 9. If switching variants, check for a collision with an existing line
    const variantChanged = newVariantId !== cartItem.variantOptionId;

    if (variantChanged) {
      const conflict = await tx.cartItem.findFirst({
        where: {
          cartId: cartItem.cartId,
          productId: cartItem.productId,
          variantOptionId: newVariantId,
          NOT: { id: cartItem.id },
        },
      });

      if (conflict) {
        const merged = await tx.cartItem.update({
          where: { id: conflict.id },
          data: { quantity: conflict.quantity + quantity },
        });
        await tx.cartItem.delete({ where: { id: cartItem.id } });
        return merged;
      }
    }

    // 10. Plain update
    return tx.cartItem.update({
      where: { id: cartItemId },
      data: { quantity, variantOptionId: newVariantId },
    });
  });
};

export const deleteCartItem = async (
  userId: number,
  cartItemIdParam: string,
) => {
  // 1. Validate the id param
  const cartItemId = Number(cartItemIdParam);
  if (!Number.isInteger(cartItemId) || cartItemId <= 0) {
    throw new ApiError(400, "Invalid cart item id");
  }

  return prisma.$transaction(async (tx) => {
    const cartItem = await tx.cartItem.findUnique({
      where: { id: cartItemId },
      include: { cart: true },
    });

    // 2. Item must exist
    if (!cartItem) {
      throw new ApiError(404, "Cart item not found");
    }

    // 3. Ownership check — this cart item must belong to the requesting user's cart
    if (cartItem.cart.userId !== userId) {
      throw new ApiError(403, "You do not have access to this cart item");
    }

    // 4. Delete it
    await tx.cartItem.delete({ where: { id: cartItemId } });

    return { removed: true, cartItemId };
  });
};
