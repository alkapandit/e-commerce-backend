import { Request, Response } from "express";
import { HTTP_STATUS } from "../../constants/httpStatus.constant";
import { sendResponse } from "../../common/utils/apiResponse.util";
import { asyncHandler } from "../../common/utils/asyncHandler.util";

import * as CartServices from "./cart.service";

export const getAllCartList = asyncHandler(
  async (req: Request, res: Response) => {
    const id = (req as any).user;
    const result = await CartServices.getAllCartList(id);
    sendResponse({
      res,
      data: result,
      success: true,
      statusCode: HTTP_STATUS.OK,
      message: "Cart fetched successfully.",
    });
  },
);
export const getCartDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await CartServices.getCartDetails(req.params.id as string);
    sendResponse({
      res,
      data: result,
      success: true,
      statusCode: HTTP_STATUS.OK,
      message: "Cart fetched successfully.",
    });
  },
);
export const updateCartItem = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await CartServices.updateCartItem(req.params.id as string);
    sendResponse({
      res,
      data: result,
      success: true,
      statusCode: HTTP_STATUS.OK,
      message: "Cart fetched successfully.",
    });
  },
);
export const addCartItem = asyncHandler(async (req: Request, res: Response) => {
  const result = await CartServices.addCartItem(req.body);
  sendResponse({
    res,
    data: result,
    success: true,
    statusCode: HTTP_STATUS.OK,
    message: "Cart fetched successfully.",
  });
});
export const deleteCartItem = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await CartServices.deleteCartItem(req.params.id as string);
    sendResponse({
      res,
      data: result,
      success: true,
      statusCode: HTTP_STATUS.OK,
      message: "Cart fetched successfully.",
    });
  },
);
