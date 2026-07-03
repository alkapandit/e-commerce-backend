import { Router } from "express";
import * as AuthController from "./auth.controller";
import { validateBody } from "../../common/middlewares/validation.middleware";
import { registerValidationSchema } from "./auth.service";
import { verifyJWT } from "../../common/middlewares/auth.middleware";

const router = Router();

router.post(
  "/register",
  validateBody(registerValidationSchema),
  AuthController?.register,
);
router.post("/login", validateBody, AuthController?.login);
router.post(
  "/refreshToken",
  verifyJWT,
  validateBody,
  AuthController?.refreshToken,
);
router.post("/send-email-otp", verifyJWT, AuthController.sendEmailOtp);
router.post("/verify-email-otp", verifyJWT, AuthController.verifyEmailOtp);
router.post("/send-phone-otp", verifyJWT, AuthController.sendPhoneOtp);
router.post("/verify-phone-otp", verifyJWT, AuthController.verifyPhoneOtp);

export default router;
