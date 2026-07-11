import { z } from "zod";

export const AddCartItemInputValidations = z.object({
  productId: z.number().int().positive(),
  quantity: z.number().int().positive().max(50, "Quantity too large"), // cap to something sane for your store
});

export const updateCartItemSchema = z.object({
  quantity: z.number().int().min(0),
  variantOptionId: z.number().int().positive().nullable().optional(),
});