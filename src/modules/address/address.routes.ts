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

const router = Router();

router.get("/", AddressController.getAllAddress);
router.get("/:id", validateParam, AddressController.getAddress);
router.post(
  "/add",
  validateBody(createAddressValidationSchema),
  AddressController.createAddress,
);
router.put(
  "/update",
  validateBody(updateAddressValidationSchema),
  AddressController.updateAddress,
);
router.delete("/:id", validateParam, AddressController.deleteAddress);

export default router;
