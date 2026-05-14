import { Router } from "express";
import {
  validateBody,
  validateParam,
  validateQuery,
} from "../../common/middlewares/validation.middleware";
import * as ProductController from "./product.controller";
import {
  addProductValidationSchema,
  updateProductValidationSchema,
} from "./product.validation";

const router = Router();

router.get("/", validateQuery, ProductController.getAllProducts);
router.get("/:id", validateParam, ProductController.getProductById);
router.post(
  "/add",
  validateBody(addProductValidationSchema),
  ProductController.addProducts,
);
router.put(
  "/update",
  validateBody(updateProductValidationSchema),
  ProductController.updateProduct,
);

export default router;
