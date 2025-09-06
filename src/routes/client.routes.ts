import { Router } from "express";
import { authenticateTokenMiddleware } from "../middleware/auth.middleware";

import {
  createClient,
  deleteClient,
  getAllClients,
  getClient,
  getClientFullInfo,
  updateClient,
} from "../controllers/client.controller";
import { clientValidator } from "../middleware/validation.middleware";
import { adminRoleMiddleware } from "../middleware/admin.middleware";

const router = Router();

router.get("/search", authenticateTokenMiddleware, getClient);
router.get("/:id/details", authenticateTokenMiddleware, getClientFullInfo);

router.get("/", authenticateTokenMiddleware, getAllClients);

router.post(
  "/create",
  authenticateTokenMiddleware,
  clientValidator,
  createClient
);

router.put(
  "/:id/edit",
  authenticateTokenMiddleware,
  adminRoleMiddleware,
  updateClient
);
router.delete(
  "/:id/delete",
  authenticateTokenMiddleware,
  adminRoleMiddleware,
  deleteClient
);

export default router;
