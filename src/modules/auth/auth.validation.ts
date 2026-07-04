import { z } from "zod";

export const registerValidationSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email format"),

  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(50, "First name too long"),

  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(50, "Last name too long"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password too long"),

  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Invalid phone number"), // Indian format

  userType: z
    .string()
    .trim()
    .toLowerCase()
    .refine((val) => ["buyer", "seller"].includes(val), {
      message: "userType must be either 'buyer' or 'seller'",
    }),
});

export const loginValidationSchema = z.object({
  identifier: z.string().trim().min(1, "Email or phone number is required"),

  password: z.string().min(1, "Password is required"),
});

export const refreshAccessTokenSchema = z.object({
  refreshToken: z.string().trim().min(1, "Refresh token is required"),
});
