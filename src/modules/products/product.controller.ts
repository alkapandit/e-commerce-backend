import * as ProductServices from "./product.service";
import { HTTP_STATUS } from "../../constants/httpStatus.constant";
import { sendResponse } from "../../common/utils/apiResponse.util";
import { asyncHandler } from "../../common/utils/asyncHandler.util";
import { Request, Response } from "express";

export const getAllProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const products = await ProductServices.getAllProducts(req?.query);
    sendResponse({
      res,
      data: products,
      success: true,
      statusCode: HTTP_STATUS.OK,
      message: "Products fetched successfully.",
    });
  },
);

export const getProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const products = await ProductServices.getProductById(req?.params?.id);
    sendResponse({
      res,
      data: products,
      success: true,
      statusCode: HTTP_STATUS.OK,
      message: "Product fetched successfully.",
    });
  },
);

export const searchProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const products = await ProductServices.searchProduct(req?.query);
    sendResponse({
      res,
      data: products,
      success: true,
      statusCode: HTTP_STATUS.OK,
      message: "Product fetched successfully.",
    });
  },
);

export const addProduct = asyncHandler(async (req: Request, res: Response) => {
  const products = await ProductServices.addProduct(req?.body?.data);
  sendResponse({
    res,
    data: products,
    success: true,
    statusCode: HTTP_STATUS.CREATED,
    message: "Product added successfully.",
  });
});

export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const products = await ProductServices.updateProduct(req?.body?.data);
    sendResponse({
      res,
      data: products,
      success: true,
      statusCode: HTTP_STATUS.OK,
      message: "Product updated successfully.",
    });
  },
);

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const products = await ProductServices.deleteProduct(req?.params?.id);
    sendResponse({
      res,
      data: products,
      success: true,
      statusCode: HTTP_STATUS.OK,
      message: "Products deleted successfully.",
    });
  },
);
