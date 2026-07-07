import { Router } from "express";
import * as CartController from "./cart.controller";
import { verifyJWT } from "../../common/middlewares/auth.middleware";
import {
  validateBody,
  validateParam,
} from "../../common/middlewares/validation.middleware";
import { addCartItemSchema } from "./cart.validation";

const router = Router();

router.get("/", verifyJWT, CartController.getAllCartList);
router.get("/:id", verifyJWT, validateParam, CartController.getCartDetails);
router.post(
  "/create",
  verifyJWT,
  validateBody(addCartItemSchema),
  CartController.getCartDetails,
);

export default router;
