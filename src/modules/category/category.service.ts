import prisma from "../../common/config/prisma";
import { ApiError } from "../../common/utils/apiError.util";

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

const deleteCategory = async (id: string) => {};
