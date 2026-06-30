import { Request, Response } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler.util";
import * as AddressServices from "./address.service";
import { sendResponse } from "../../common/utils/apiResponse.util";
import { HTTP_STATUS } from "../../constants/httpStatus.constant";

export const getAllAddress = asyncHandler(
  async (req: Request, res: Response) => {
    const addresses = await AddressServices.getAllAddress();
    sendResponse({
      res,
      data: addresses,
      success: true,
      statusCode: HTTP_STATUS.OK,
      message: "Address fetched successfully.",
    });
  },
);

export const getAddress = asyncHandler(async (req: Request, res: Response) => {
  const addresses = await AddressServices.getAddress(req?.params?.id as string);
  sendResponse({
    res,
    data: addresses,
    success: true,
    statusCode: HTTP_STATUS.OK,
    message: "Address fetched successfully.",
  });
});

export const createAddress = asyncHandler(
  async (req: Request, res: Response) => {
    const addresses = await AddressServices.createAddress(req?.body);
    sendResponse({
      res,
      data: addresses,
      success: true,
      statusCode: HTTP_STATUS.OK,
      message: "Address added successfully.",
    });
  },
);

export const updateAddress = asyncHandler(
  async (req: Request, res: Response) => {
    const addresses = await AddressServices.updateAddress(req?.body);
    sendResponse({
      res,
      data: addresses,
      success: true,
      statusCode: HTTP_STATUS.OK,
      message: "Address updated successfully.",
    });
  },
);

export const deleteAddress = asyncHandler(
  async (req: Request, res: Response) => {
    const addresses = await AddressServices.deleteAddress(
      req?.params?.id as string,
    );
    sendResponse({
      res,
      data: addresses,
      success: true,
      statusCode: HTTP_STATUS.OK,
      message: "Address deleted successfully.",
    });
  },
);
