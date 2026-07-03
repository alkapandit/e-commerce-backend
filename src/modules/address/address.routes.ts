import { Router } from "express";
import * as AddressController from "./address.controller";
import {
  validateBody,
  validateParam,
} from "../../common/middlewares/validation.middleware";
import {
  createAddressValidationSchema,
  updateAddressValidationSchema,
} from "./address.validation";
import { verifyJWT } from "../../common/middlewares/auth.middleware";

const router = Router();

router.get("/", verifyJWT, AddressController.getAllAddress);
router.get("/:id", verifyJWT, validateParam, AddressController.getAddress);
router.post(
  "/add",
  verifyJWT,
  validateBody(createAddressValidationSchema),
  AddressController.createAddress,
);
router.put(
  "/update",
  verifyJWT,
  validateBody(updateAddressValidationSchema),
  AddressController.updateAddress,
);
router.delete(
  "/:id",
  verifyJWT,
  validateParam,
  AddressController.deleteAddress,
);

export default router;
