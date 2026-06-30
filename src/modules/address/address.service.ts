import prisma from "../../common/config/prisma";
import { ApiError } from "../../common/utils/apiError.util";
import { CreateAddressInput, UpdateAddressInput } from "./address.types";

export const getAllAddress = async () => {
  const result = await prisma.address.findFirst();

  if (!result) {
    throw new ApiError(404, "No Address found!");
  }

  return result;
};

export const getAddress = async (id: string) => {
  const result = await prisma.address.findUnique({ where: { id: Number(id) } });
  if (!result) {
    throw new ApiError(404, "Address not found!");
  }

  return result;
};

export const createAddress = async (data: CreateAddressInput) => {
  const result = await prisma.address.create({ data });

  if (!result) {
    throw new ApiError(500, "Error in adding address!");
  }

  return result;
};
export const updateAddress = async (data: UpdateAddressInput) => {
  const result = await prisma.address.update({
    where: { id: data?.id },
    data: data,
  });

  if (!result) {
    throw new ApiError(500, "Error in updating address!");
  }

  return result;
};
export const deleteAddress = async (id: string) => {
  const result = await prisma.address.delete({ where: { id: Number(id) } });

  if (!result) {
    throw new ApiError(500, "Error in deleting address!");
  }

  return result;
};
