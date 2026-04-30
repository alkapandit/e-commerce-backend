import { Router } from "express";
import {
  validateBody,
  validateParam,
  validateQuery,
} from "../../common/middlewares/validation.middleware";
import * as ProductController from "./product.controller";

const router = Router();

router.post("/", validateQuery, ProductController.getAllProducts);
router.get("/search", validateQuery, ProductController.searchProduct);
router.get("/:id", validateParam, ProductController.getProductById);
router.put("/:id", validateParam, ProductController.updateProduct);

export default router;
