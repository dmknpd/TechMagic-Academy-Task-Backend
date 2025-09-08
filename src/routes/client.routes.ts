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

router.get("/", authenticateTokenMiddleware, getAllClients);

router.get("/search", authenticateTokenMiddleware, getClient);
router.get("/:id/details", authenticateTokenMiddleware, getClientFullInfo);

router.post("/", authenticateTokenMiddleware, clientValidator, createClient);

router.put(
  "/:id/edit",
  authenticateTokenMiddleware,
  adminRoleMiddleware,
  clientValidator,
  updateClient
);
router.delete(
  "/:id/delete",
  authenticateTokenMiddleware,
  adminRoleMiddleware,
  deleteClient
);

export default router;
