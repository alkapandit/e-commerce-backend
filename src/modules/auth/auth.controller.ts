import { Request, Response } from "express";
import * as AuthService from "./auth.service";
import { HTTP_STATUS } from "../../constants/httpStatus.constant";
import { sendResponse } from "../../common/utils/apiResponse.util";
import { asyncHandler } from "../../common/utils/asyncHandler.util";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const user = await AuthService.register(req?.body);

  sendResponse({
    res,
    data: user,
    success: true,
    statusCode: HTTP_STATUS.CREATED,
    message: "User Registered Successfully.",
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const user = await AuthService.login(req?.body);

  const { accessToken, refreshToken } = user;
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
  };

  res.cookie("accessToken", accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  sendResponse({
    res,
    data: user,
    success: true,
    statusCode: HTTP_STATUS.OK,
    message: "User loggedin successfully.",
  });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {});

export const refreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    const accessToken = await AuthService.refreshToken(req?.cookies);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
    };

    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    });

    sendResponse({
      res,
      data: accessToken,
      success: true,
      statusCode: HTTP_STATUS.OK,
      message: "Token refreshed successfully.",
    });
  },
);

export const sendEmailOtp = asyncHandler(
  async (req: Request, res: Response) => {
    const otpRes = await AuthService.sendEmailOtp(req.body.email);
    sendResponse({
      res,
      data: null,
      success: true,
      statusCode: HTTP_STATUS.OK,
      message: "OTP sent successfully.",
    });
  },
);

export const verifyEmailOtp = asyncHandler(
  async (req: Request, res: Response) => {
    const verifiedEmail = await AuthService.verifyEmailOtp(
      req.body.email,
      req.body.otp,
    );
    sendResponse({
      res,
      data: null,
      success: true,
      statusCode: HTTP_STATUS.OK,
      message: "Your email id verified successfully.",
    });
  },
);

export const sendPhoneOtp = asyncHandler(
  async (req: Request, res: Response) => {
    const otpRes = await AuthService.sendPhoneOtp(req.body.phone);
    sendResponse({
      res,
      data: null,
      success: true,
      statusCode: HTTP_STATUS.OK,
      message: "OTP sent successfully.",
    });
  },
);

export const verifyPhoneOtp = asyncHandler(
  async (req: Request, res: Response) => {
    const verifiedPhone = await AuthService.verifyPhoneOtp(
      req.body.phone,
      req.body.otp,
    );
    sendResponse({
      res,
      data: null,
      success: true,
      statusCode: HTTP_STATUS.OK,
      message: "Your phone number verified successfully.",
    });
  },
);

export const forgotPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await AuthService.forgotPassword(req.body?.userId, req.body);
    sendResponse({
      res,
      data: user,
      success: true,
      statusCode: HTTP_STATUS.OK,
      message: "Password reset successfully",
    });
  },
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await AuthService.resetPassword(req.body?.userId, req.body);
    sendResponse({
      res,
      data: user,
      success: true,
      statusCode: HTTP_STATUS.OK,
      message: "Password reset successfully",
    });
  },
);
