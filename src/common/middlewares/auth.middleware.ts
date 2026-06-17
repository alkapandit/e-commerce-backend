import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request } from "express";

import prisma from "../config/prisma";
import { ApiError } from "../utils/apiError.util";
import { asyncHandler } from "../utils/asyncHandler.util";

interface JwtUserPayload extends JwtPayload {
  userId: string;
}

export const verifyJWT = asyncHandler(
  async (req: Request, _, next: NextFunction) => {
    const token =
      req.cookies.accessToken ||
      req.header("authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request!");
    }

    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!,
    ) as JwtUserPayload;

    const user = await prisma.user.findUnique({
      where: { id: Number(decodedToken?.userId) },
      select: {
        id: true,
        role: true,
        email: true,
        phone: true,
        firstName: true,
        lastName: true,
      },
    });

    if (!user) {
      throw new ApiError(401, "Invalid access token!");
    }

    (req as any).user = user;

    next();
  },
);
