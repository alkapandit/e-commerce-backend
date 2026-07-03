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
import { verifyJWT } from "../../common/middlewares/auth.middleware";

const router = Router();

router.get("/", verifyJWT, CategoryController.getAllCategories);
router.post(
  "/create",
  verifyJWT,
  validateBody(createCategoryValidationSchema),
  CategoryController.createCategory,
);
router.put(
  "/update",
  verifyJWT,
  validateBody(updateCategoryValidationSchema),
  CategoryController.updateCategory,
);
router.get(
  "/:id",
  verifyJWT,
  validateParam,
  CategoryController.getCategoryById,
);
router.delete(
  "/:id",
  verifyJWT,
  validateParam,
  CategoryController.deleteCategoryById,
);

export default router;
