import { z } from "zod";

const variantOptionValidation = z.object({
  value: z.string(),
  price: z.number().optional(),
  stock: z.number().optional(),
});

const productVariantValidation = z.object({
  name: z.string(),
  options: z.array(variantOptionValidation), // ✅ IMPORTANT
});

// ✅ Dimensions schema
const dimensionsValidation = z.object({
  length: z.number().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

// ✅ Main Product Schema
export const addProductValidation = z.array(
  z.object({
    name: z.string().min(1, "Product name is required"),

    description: z.string().optional(),

    price: z.number().positive("Price must be > 0"),

    discountPrice: z.number().optional(),

    categoryId: z.string().min(1, "Category is required"),

    subCategoryId: z.string().optional(),

    brand: z.string().optional(),

    sku: z.string().optional(),

    stock: z.number().int().min(0, "Stock cannot be negative"),

    images: z
      .array(z.string().url("Invalid image URL"))
      .min(1, "At least one image is required"),

    isActive: z.boolean().optional(),

    isFeatured: z.boolean().optional(),

    tags: z.array(z.string()).optional(),

    weight: z.number().optional(),

    dimensions: dimensionsValidation.optional(),

    variants: z.array(productVariantValidation).optional(),

    createdBy: z.string().min(1, "createdBy is required"),
  }),
);
