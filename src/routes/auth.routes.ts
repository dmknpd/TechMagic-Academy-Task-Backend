import { Router } from "express";

import {
  registerValidator,
  loginValidator,
} from "../middleware/validation.middleware";

import {
  register,
  login,
  refreshToken,
  logout,
} from "../controllers/auth.controller";

const router = Router();

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);
router.get("/refresh", refreshToken);
router.get("/logout", logout);

export default router;
