import { Router } from "express";
import * as CategoryController from "./category.controller";
import { validateParam } from "../../common/middlewares/validation.middleware";

const router = Router();

router.get("/", CategoryController.getAllCategories);
router.get("/:id", validateParam, CategoryController.getCategoryById);
router.delete("/:id", validateParam, CategoryController.deleteCategoryById);

export default router;
