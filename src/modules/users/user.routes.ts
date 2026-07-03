import { Router } from "express";
import { validateBody } from "../../common/middlewares/validation.middleware";

import * as UserController from "./user.controller";
import { verifyJWT } from "../../common/middlewares/auth.middleware";

const router = Router();

router.get("/profile", verifyJWT, validateBody, UserController.getProfile);
router.put("/update", verifyJWT, validateBody, UserController.updateProfile);

export default router;
