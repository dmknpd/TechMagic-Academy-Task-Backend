import { Router } from "express";
import { authenticateTokenMiddleware } from "../middleware/auth.middleware";

import { createClient, getAllClients } from "../controllers/client.controller";
import { clientValidator } from "../middleware/validation.middleware";

const router = Router();

router.get("/", authenticateTokenMiddleware, getAllClients);

router.post(
  "/create",
  authenticateTokenMiddleware,
  clientValidator,
  createClient
);

export default router;
