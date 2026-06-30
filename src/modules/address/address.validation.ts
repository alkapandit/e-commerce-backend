import { z } from "zod";

export const createAddressValidationSchema = z.object({
  userId: z.number({ error: "User ID is required." }).int().positive(),

  type: z.enum(["HOME", "OFFICE", "WAREHOUSE"], {
    error: "Invalid address type.",
  }),

  addressLine1: z
    .string()
    .trim()
    .min(1, "Address Line 1 is required.")
    .max(255, "Address Line 1 cannot exceed 255 characters."),

  addressLine2: z
    .string()
    .trim()
    .max(255, "Address Line 2 cannot exceed 255 characters.")
    .optional(),

  city: z
    .string()
    .trim()
    .min(1, "City is required.")
    .max(100, "City cannot exceed 100 characters."),

  state: z
    .string()
    .trim()
    .min(1, "State is required.")
    .max(100, "State cannot exceed 100 characters."),

  country: z
    .string()
    .trim()
    .min(1, "Country is required.")
    .max(100, "Country cannot exceed 100 characters."),

  pincode: z
    .string()
    .trim()
    .regex(/^[1-9][0-9]{5}$/, "Invalid pincode."),

  isDefault: z.boolean().optional(),
});

export const updateAddressValidationSchema = z.object({
  id: z.number({ error: "Address ID is required." }).int().positive(),

  addressLine1: z.string().trim().min(1).max(255).optional(),

  type: z.enum(["HOME", "OFFICE", "WAREHOUSE"]).optional(),

  country: z.string().trim().min(1).max(100).optional(),

  addressLine2: z.string().trim().max(255).optional(),

  state: z.string().trim().min(1).max(100).optional(),

  city: z.string().trim().min(1).max(100).optional(),

  userId: z.number().int().positive().optional(),

  isDefault: z.boolean().optional(),

  pincode: z
    .string()
    .trim()
    .regex(/^[1-9][0-9]{5}$/, "Invalid pincode.")
    .optional(),
});
