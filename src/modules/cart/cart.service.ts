import prisma from "../../common/config/prisma";
import { ApiError } from "../../common/utils/apiError.util";

export const getAllCartList = async (userid: string) => {
  const result = await prisma.cart.findMany({
    where: { userId: Number(userid) },
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
  const { productId, quantity } = data;

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
        cartId_productId: { cartId: cart.id, productId },
      },
      create: {
        cartId: cart.id,
        productId,
        quantity,
      },
      update: {
        quantity: { increment: quantity },
      },
    });

    return cartItem;
  });
};

export const updateCartItem = async (cartId: string) => {};
export const deleteCartItem = async (cartId: string) => {};
