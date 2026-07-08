import { z } from "zod";

export const AddCartItemInputValidations = z.object({
  productId: z.number().int().positive(),
  quantity: z.number().int().positive().max(50, "Quantity too large"), // cap to something sane for your store
});
