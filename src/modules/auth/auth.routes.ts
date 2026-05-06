import { Router } from "express";
import * as AuthController from "./auth.controller";
import { validateBody } from "../../common/middlewares/validation.middleware";
import { registerValidationSchema } from "./auth.service";

const router = Router();

router.post(
  "/register",
  validateBody(registerValidationSchema),
  AuthController?.register,
);
router.post("/login", validateBody, AuthController?.login);
router.post("/refreshToken", validateBody, AuthController?.refreshToken);
router.post("/send-email-otp", AuthController.sendEmailOtp);
router.post("/verify-email-otp", AuthController.verifyEmailOtp);
router.post("/send-phone-otp", AuthController.sendPhoneOtp);
router.post("/verify-phone-otp", AuthController.verifyPhoneOtp);

export default router;
