import { Request, Response } from "express";
import * as CategoryServices from "./category.service";
import { HTTP_STATUS } from "../../constants/httpStatus.constant";
import { sendResponse } from "../../common/utils/apiResponse.util";
import { asyncHandler } from "../../common/utils/asyncHandler.util";
import prisma from "../../common/config/prisma";
import { success } from "zod";

export const getAllCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const categories = await CategoryServices.getAllCategories();
    sendResponse({
      res,
      data: categories,
      success: true,
      statusCode: HTTP_STATUS.OK,
      message: "Categories fatched successfully.",
    });
  },
);

export const getCategoryById = asyncHandler(
  async (req: Request, res: Response) => {
    const category = await CategoryServices.getCategoryById(
      req?.params?.id as string,
    );
    sendResponse({
      res,
      data: category,
      success: true,
      statusCode: HTTP_STATUS.OK,
      message: "Category fatched successfully.",
    });
  },
);

export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    console.log("req",req.body)
    const category = await CategoryServices.createCategory(req.body)

    sendResponse({
      res,
      data: category,
      success: true,
      statusCode: HTTP_STATUS.CREATED,
      message: "Category created successfully.",
    });
  },
);

export const deleteCategoryById = asyncHandler(
  async (req: Request, res: Response) => {
    const category = await CategoryServices.deleteCategoryById(
      req?.params?.id as string,
    );
    sendResponse({
      res,
      data: category,
      success: true,
      statusCode: HTTP_STATUS.OK,
      message: "Category deleted successfully.",
    });
  },
);
