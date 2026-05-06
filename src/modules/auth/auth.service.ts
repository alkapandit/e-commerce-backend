import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../../common/utils/token.util";
import prisma from "../../common/config/prisma";
import { ApiError } from "../../common/utils/apiError.util";
import { HTTP_STATUS } from "../../constants/httpStatus.constant";
import {
  LoginInput,
  RegisterInput,
  RefreshAccessTokenInput,
} from "./auth.types";
import { generateOTP } from "../../common/utils/otp.util";
import { z } from "zod";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, // e.g. "smtp.xyz.com"
  port: Number(process.env.EMAIL_PORT), // usually 587 or 465
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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

export const register = async (data: RegisterInput) => {
  const { email, firstName, lastName, password, phone, userType } = data;

  if (!email || !firstName || !lastName || !password || !phone || !userType) {
    throw new ApiError(HTTP_STATUS?.BAD_REQUEST, "All fields are mandatory!");
  }

  try {
    const isUserExisting = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }].filter(Boolean),
      },
    });

    if (isUserExisting) {
      throw new ApiError(
        409,
        "User with email or phone number already exists!",
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // const user = await prisma.user.create({
    //   data: {
    //     email,
    //     firstName,
    //     lastName,
    //     phone,
    //     passwordHash,
    //     role: userType?.toLocaleLowerCase() === "seller" ? "SELLER" : "BUYER",
    //   },
    //   select: {
    //     firstName: true,
    //     lastName: true,
    //     email: true,
    //     phone: true,
    //   },
    // });

    // return user;

    const result = await prisma.$transaction(async (tx) => {
      // ✅ Step 1: Create User
      const user = await tx.user.create({
        data: {
          email,
          firstName,
          lastName,
          phone,
          passwordHash,
          role: userType.toLowerCase() === "seller" ? "SELLER" : "BUYER",
        },
      });

      // ✅ Step 2: Create Seller (ONLY if seller)
      if (userType.toLowerCase() === "seller") {
        await tx.seller.create({
          data: {
            userId: user.id,
          },
        });
      }
      // ✅ Step 2: Create Buyer (ONLY if seller)
      if (userType.toLowerCase() === "buyer") {
        await tx.buyer.create({
          data: {
            userId: user.id,
          },
        });
      }

      return user;
    });
    return result;
  } catch (error) {
    console.error("Register Error:", error);

    throw new ApiError(500, "Failed to register user");
  }
};

export const login = async (data: LoginInput) => {
  const { identifier, password } = data;

  const identifierTrimmed = identifier?.trim();

  if (!identifierTrimmed || !password) {
    throw new ApiError(400, "All fields are required!");
  }

  console.log("identifierTrimmed", identifierTrimmed);

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: { equals: identifierTrimmed, mode: "insensitive" } },
          { phone: identifierTrimmed },
        ],
      },
    });

    if (!user) {
      throw new ApiError(404, "User does not exist!");
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid user credential!");
    }

    const accessToken = generateAccessToken((user?.id).toString());
    const refreshToken = generateRefreshToken((user?.id).toString());

    if (!accessToken || !refreshToken) {
      throw new ApiError(500, "Error in generating refresh and access token!");
    }

    const hashRefreshToken = await bcrypt.hash(refreshToken, 10);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: hashRefreshToken },
      }),
    ]);

    return {
      user: { email: user?.email, role: user?.role },
      accessToken,
      refreshToken,
    };
  } catch (error: any) {
    console.error("error in updating refresh token: ", error);

    if (error instanceof ApiError) {
      throw error; // ✅ preserve real error
    }

    throw new ApiError(500, "Failed to login user!");
  }
};

export const logout = async (userId: string) => {};

export const refreshToken = async (data: RefreshAccessTokenInput) => {
  const { refreshToken } = data;
  if (!refreshToken) {
    throw new ApiError(400, "Refresh token is required!");
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!,
    ) as { userId: string };

    const newAccessToken = generateAccessToken(decoded?.userId);

    return newAccessToken;
  } catch (error) {
    console.error("Error in refreshing access token!");
    throw new ApiError(500, "Falied to refresh token!");
  }
};

export const sendEmailOtp = async (email: string) => {
  console.log("email", email);

  // Simple email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Invalid email format");
  }

  // console.log("await prisma.user", await prisma.user);
  const user = await prisma.user.findFirst({ where: { email } });
  console.log("sendEmailOtp user", user);
  if (!user) {
    throw new ApiError(404, "Email does not exist!");
  }

  try {
    const otp = generateOTP().toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    console.log("otp expiry", otp, expiry);

    // console.log("transporter", transporter);
    console.log("process.env.EMAIL_USER", process.env.EMAIL_USER);
    const otpSent = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Your Verification Code - ${otp}`,
      text: `
    Your One-Time Password (OTP) is: ${otp}

    This OTP is valid for 10 minutes.

    If you did not request this, please ignore this email.
      `,
    });

    if (otpSent.rejected.length > 0 || !otpSent.accepted.includes(email)) {
      throw new ApiError(500, "Email could not be delivered");
    }

    const result = await prisma.user.update({
      where: { email },
      data: {
        emailOtp: otp,
        otpExpiry: expiry,
      },
    });

    return result;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const verifyEmailOtp = async (email: string, otp: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user?.emailOtp !== otp) {
    throw new ApiError(400, "Invalid OTP!");
  }
  if (!user?.otpExpiry || user?.otpExpiry < new Date()) {
    throw new ApiError(400, "OTP Expired!");
  }

  const result = await prisma.user.update({
    where: { email },
    data: {
      isEmailVerified: true,
      emailOtp: null,
      otpExpiry: null,
    },
  });

  return result;
};

export const sendPhoneOtp = async (token: string) => {};

export const verifyPhoneOtp = async (phone: string, otp: string) => {
  const user = await prisma.user.findFirst({ where: { phone } });

  if (!user || user?.phoneOtp !== otp) {
    throw new ApiError(400, "Invalid OTP!");
  }
  if (!user?.otpExpiry || user?.otpExpiry < new Date()) {
    throw new ApiError(400, "OTP Expired!");
  }

  const result = await prisma.user.update({
    where: { id: user?.id },
    data: {
      isEmailVerified: true,
      phoneOtp: null,
      otpExpiry: null,
    },
  });

  return result;
};

export const forgotPassword = async (id: string, data: any) => {};

export const resetPassword = async (id: string, data: any) => {};
