import prisma from "../../common/config/prisma";
import { ApiError } from "../../common/utils/apiError.util";
import { Prisma } from "../../generated/prisma/client";
import {
  AddProductInput,
  ProductSearchQueryInput,
  UpdateProductInput,
} from "./product.types";

import { ZodError } from "zod";

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

export const getProductById = async (id: string) => {
  const productId = Number(id);

  if (isNaN(productId)) {
    throw new ApiError(400, "Invalid product ID");
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

export const addProducts = async (products: AddProductInput[]) => {
  try {
    const validatedProducts = products;

    const result = await prisma.$transaction(async (tx) => {
      const createdProducts = [];

      for (const p of validatedProducts) {
        // ✅ 1. Create Product
        const product = await tx.product.create({
          data: {
            name: p.name,
            description: p.description ?? null,
            price: new Prisma.Decimal(p.price),
            stock: p.stock,
            images: p.images,
            categoryId: Number(p.categoryId),
            sellerId: Number(p.createdBy),
            isActive: p.isActive ?? true,
          },
        });

        // ✅ 2. Create Variants (if exist)
        if (p.variants && p.variants.length) {
          for (const variant of p.variants) {
            const createdVariant = await tx.productVariant.create({
              data: {
                name: variant.name,
                productId: product.id,
              },
            });

            // ✅ 3. Create Variant Options
            if (variant.options && variant.options.length) {
              await tx.variantOption.createMany({
                data: variant.options.map((opt) => ({
                  variantId: createdVariant.id,
                  value: opt.value,
                  price: opt.price ? new Prisma.Decimal(opt.price) : null,
                  stock: opt.stock ?? null,
                })),
              });
            }
          }
        }

        createdProducts.push(product);
      }

      return createdProducts;
    });

    return result;
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ApiError(
        400,
        error.issues.map((err) => err.message).join(", "),
      );
    }

    throw error;
  }
};

export const updateProduct = async (
  id: string,
  payload: UpdateProductInput,
) => {
  try {
    const productId = Number(id);

    if (isNaN(productId)) {
      throw new ApiError(400, "Invalid product ID");
    }

    return await prisma.$transaction(async (tx) => {
      // ✅ 1. Check if product exists
      const existingProduct = await tx.product.findUnique({
        where: { id: productId },
      });

      if (!existingProduct) {
        throw new ApiError(404, "Product not found");
      }

      // ✅ 2. Update product basic fields
      const updatedProduct = await tx.product.update({
        where: { id: productId },
        data: {
          name: payload.name,
          description: payload.description ?? null,
          price: payload.price ? new Prisma.Decimal(payload.price) : undefined,
          stock: payload.stock,
          images: payload.images,
          categoryId: payload.categoryId
            ? Number(payload.categoryId)
            : undefined,
          isActive: payload.isActive,
        },
      });

      // ✅ 3. Delete old variants (cascade options manually)
      const variants = await tx.productVariant.findMany({
        where: { productId },
      });

      const variantIds = variants.map((v) => v.id);

      if (variantIds.length) {
        await tx.variantOption.deleteMany({
          where: { variantId: { in: variantIds } },
        });

        await tx.productVariant.deleteMany({
          where: { productId },
        });
      }

      // ✅ 4. Recreate variants
      if (payload.variants && payload.variants.length) {
        for (const variant of payload.variants) {
          const createdVariant = await tx.productVariant.create({
            data: {
              name: variant.name,
              productId,
            },
          });

          if (variant.options && variant.options.length) {
            await tx.variantOption.createMany({
              data: variant.options.map((opt) => ({
                variantId: createdVariant.id,
                value: opt.value,
                price: opt.price ? new Prisma.Decimal(opt.price) : null,
                stock: opt.stock ?? null,
              })),
            });
          }
        }
      }

      return updatedProduct;
    });
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ApiError(400, error.issues.map((e) => e.message).join(", "));
    }
    throw error;
  }
};

export const deleteProduct = async (id: string | string[]) => {};
