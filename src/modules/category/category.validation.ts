import { z } from "zod";

export const createCategoryValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Category name is required")
    .max(100, "Category name cannot exceed 100 characters"),
});

export const updateCategoryValidationSchema = z.object({
  id: z.number({ error: "Category ID is required" }).int().positive(),
  name: z
    .string()
    .trim()
    .min(1, "Category name is required")
    .max(100, "Category name cannot exceed 100 characters"),
});
