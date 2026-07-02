import prisma from "../../common/config/prisma";
import { ApiError } from "../../common/utils/apiError.util";
import { CreateCategoryInput, UpdateCategoryInput } from "./category.types";

export const getAllCategories = async () => {
  return await prisma.category.findMany();
};

export const getCategoryById = async (id: string) => {
  const categoryId = Number(id);

  if (isNaN(categoryId)) {
    throw new ApiError(400, "Invalid category Id!");
  }

  const category = await prisma.category.findFirst({
    where: { id: categoryId },
  });

  if (!category) {
    throw new ApiError(404, "Category not found!");
  }
  return category;
};

export const createCategory = async (data: CreateCategoryInput) => {
  const existingCategory = await prisma.category.findFirst({
    where: {
      name: data.name,
    },
  });

  if (existingCategory) {
    throw new ApiError(409, "Category already exists");
  }

  const category = await prisma.category.create({ data });

  if (!category) {
    throw new ApiError(500, "Getting error in creating category!");
  }

  return category;
};

export const updateCategory = async (data: UpdateCategoryInput) => {
  const category = await prisma.category.findUnique({
    where: { id: data.id },
  });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  const existingCategory = await prisma.category.findFirst({
    where: {
      name: data.name,
      NOT: {
        id: data.id,
      },
    },
  });

  if (existingCategory) {
    throw new ApiError(409, "Category already exists");
  }

  return await prisma.category.update({
    where: { id: data.id },
    data: {
      name: data.name,
    },
  });
};

export const deleteCategoryById = async (id: string) => {
  try {
    const categoryId = Number(id);

    // Validate category ID
    if (isNaN(categoryId)) {
      throw new ApiError(400, "Invalid category ID");
    }

    // Check category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!existingCategory) {
      throw new ApiError(404, "Category not found");
    }

    // Check if category is used in any product
    const linkedProduct = await prisma.product.findFirst({
      where: {
        categoryId: categoryId,
      },
    });

    if (linkedProduct) {
      throw new ApiError(
        400,
        "Category cannot be deleted because it is linked to products",
      );
    }

    // Delete category
    await prisma.category.delete({
      where: { id: categoryId },
    });

    return null;
  } catch (error) {
    throw error;
  }
};
