import { Router } from "express";
import { authenticateTokenMiddleware } from "../middleware/auth.middleware";

import { createItinerary } from "../controllers/itinerary.controller";
import { itineraryValidator } from "../middleware/validation.middleware";

const router = Router();

router.post(
  "/create",
  authenticateTokenMiddleware,
  itineraryValidator,
  createItinerary
);

export default router;
