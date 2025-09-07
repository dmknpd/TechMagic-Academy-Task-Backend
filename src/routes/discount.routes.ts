import { Router } from "express";
import { authenticateTokenMiddleware } from "../middleware/auth.middleware";
import {
  createDiscount,
  deleteDiscount,
  getAllDiscounts,
  updateDiscount,
} from "../controllers/discount.contoller";
import { adminRoleMiddleware } from "../middleware/admin.middleware";

const router = Router();

router.get("/", authenticateTokenMiddleware, getAllDiscounts);

router.post(
  "/create",
  authenticateTokenMiddleware,
  adminRoleMiddleware,
  createDiscount
);

router.put(
  "/:id/edit",
  authenticateTokenMiddleware,
  adminRoleMiddleware,
  updateDiscount
);

router.delete(
  "/:id/delete",
  authenticateTokenMiddleware,
  adminRoleMiddleware,
  deleteDiscount
);

export default router;
