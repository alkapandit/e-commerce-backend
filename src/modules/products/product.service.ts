import prisma from "../../common/config/prisma";
import { Prisma } from "../../generated/prisma/client";
import {
  AddProductInput,
  ProductSearchQueryInput,
  UpdateProductInput,
} from "./product.types";

export const getAllProducts = async (data: ProductSearchQueryInput) => {
  const {
    search,
    category,
    page = "1",
    limit = "10",
    minPrice,
    maxPrice,
  } = data;

  // ✅ Convert to proper types
  const pageNumber = Number(page) || 1;
  const limitNumber = Number(limit) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  const min = minPrice ? Number(minPrice) : undefined;
  const max = maxPrice ? Number(maxPrice) : undefined;
  const categoryId = category ? Number(category) : undefined;

  // ✅ Prisma where condition
  const where: Prisma.ProductWhereInput = {
    ...(search && {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ],
    }),

    ...(categoryId && { categoryId }),

    ...((min || max) && {
      price: {
        ...(min && { gte: min }),
        ...(max && { lte: max }),
      },
    }),
  };

  // ✅ Query DB
  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limitNumber,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count({ where }),
  ]);

  // ✅ Send Response
  return {
    data: products,
    meta: {
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
    },
  };
};

export const searchProduct = async (data: ProductSearchQueryInput) => {};

export const getProductById = async (id: string | string[]) => {};

export const addProduct = async (products: AddProductInput[]) => {};

export const updateProduct = async (products: UpdateProductInput) => {};

export const deleteProduct = async (id: string | string[]) => {};
