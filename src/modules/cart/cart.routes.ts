import { Router } from "express";
import * as CartController from "./cart.controller";
import { verifyJWT } from "../../common/middlewares/auth.middleware";
import {
  validateBody,
  validateParam,
} from "../../common/middlewares/validation.middleware";
import {
  AddCartItemInputValidations,
  updateCartItemSchema,
} from "./cart.validation";

const router = Router();

router.get("/", verifyJWT, CartController.getAllCartList);
router.post(
  "/create",
  verifyJWT,
  validateBody(AddCartItemInputValidations),
  CartController.addCartItem,
);
router.put(
  "/update/:id",
  verifyJWT,
  validateBody(updateCartItemSchema),
  CartController.updateCartItem,
);
router.get("/:id", verifyJWT, validateParam, CartController.getCartDetails);
router.delete("/:id", verifyJWT, validateParam, CartController.deleteCartItem);

export default router;
