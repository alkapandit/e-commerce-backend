import { Router } from "express";
import * as CategoryController from "./category.controller";
import {
  validateBody,
  validateParam,
} from "../../common/middlewares/validation.middleware";
import {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
} from "./category.validation";

const router = Router();

router.get("/", CategoryController.getAllCategories);
router.post(
  "/create",
  validateBody(createCategoryValidationSchema),
  CategoryController.createCategory,
);
router.put(
  "/update",
  validateBody(updateCategoryValidationSchema),
  CategoryController.updateCategory,
);
router.get("/:id", validateParam, CategoryController.getCategoryById);
router.delete("/:id", validateParam, CategoryController.deleteCategoryById);

export default router;
