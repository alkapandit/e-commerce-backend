import { Router } from "express";
import {
  validateBody,
  validateParam,
  validateQuery,
} from "../../common/middlewares/validation.middleware";
import * as ProductController from "./product.controller";

const router = Router();

router.get("/", validateQuery, ProductController.getAllProducts);
router.get("/:id", validateParam, ProductController.getProductById);
router.post("/add", validateBody, ProductController.addProducts);
router.put("/update", validateParam, ProductController.updateProduct);

export default router;
