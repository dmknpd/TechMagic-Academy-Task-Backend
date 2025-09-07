import { Router } from "express";
import { authenticateTokenMiddleware } from "../middleware/auth.middleware";
import {
  createDiscount,
  deleteDiscount,
  getAllDiscounts,
  updateDiscount,
} from "../controllers/discount.controller";
import { adminRoleMiddleware } from "../middleware/admin.middleware";
import { discountValidator } from "../middleware/validation.middleware";

const router = Router();

router.get("/", authenticateTokenMiddleware, getAllDiscounts);

router.post(
  "/create",
  authenticateTokenMiddleware,
  adminRoleMiddleware,
  discountValidator,
  createDiscount
);

router.put(
  "/:id/edit",
  authenticateTokenMiddleware,
  adminRoleMiddleware,
  discountValidator,
  updateDiscount
);

router.delete(
  "/:id/delete",
  authenticateTokenMiddleware,
  adminRoleMiddleware,
  deleteDiscount
);

export default router;
