import { Router } from "express";
import {
  validateBody,
  validateParam,
  validateQuery,
} from "../../common/middlewares/validation.middleware";
import * as ProductController from "./product.controller";
import {
  addProductValidationSchema,
  deleteProductValidationSchema,
  updateProductValidationSchema,
} from "./product.validation";
import { verifyJWT } from "../../common/middlewares/auth.middleware";

const router = Router();

router.get("/", verifyJWT, ProductController.getAllProducts);
router.get("/:id", verifyJWT, validateParam, ProductController.getProductById);
router.post(
  "/add",
  verifyJWT,
  validateBody(addProductValidationSchema),
  ProductController.addProducts,
);
router.put(
  "/update",
  verifyJWT,
  validateBody(updateProductValidationSchema),
  ProductController.updateProduct,
);
router.delete(
  "/delete",
  verifyJWT,
  validateBody(deleteProductValidationSchema),
  ProductController.deleteProduct,
);

export default router;
