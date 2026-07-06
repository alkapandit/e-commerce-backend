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

export const addCartItem = async (data: any) => {
  const result = await prisma.cart.create({ data });
  if (!result) {
    throw new ApiError(500, "Error in creating cart!");
  }
};

export const updateCartItem = async (cartId: string) => {};
export const deleteCartItem = async (cartId: string) => {};
