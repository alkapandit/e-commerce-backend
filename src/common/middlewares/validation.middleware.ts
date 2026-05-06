import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/apiError.util";
import { ZodSchema } from "zod";

export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = schema.parse(req.body);

      req.body = validated; // ✅ override with validated data

      next();
    } catch (error: any) {
      return next(
        new ApiError(
          400,
          error?.issues?.map((e: any) => e.message).join(", ") ||
            "Validation error",
        ),
      );
    }
  };
};

export const validateParam = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.params) {
    return next(new ApiError(400, "Invalid request param!"));
  }
  next();
};

export const validateQuery = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.query) {
    return next(new ApiError(400, "Invalid request query!"));
  }
  next();
};
