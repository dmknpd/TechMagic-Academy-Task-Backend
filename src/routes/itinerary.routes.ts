import { Router } from "express";
import { authenticateTokenMiddleware } from "../middleware/auth.middleware";

import {
  createItinerary,
  deleteItinerary,
  getAllItineraries,
  getItinerariesById,
  updateItinerary,
} from "../controllers/itinerary.controller";
import { itineraryValidator } from "../middleware/validation.middleware";
import { adminRoleMiddleware } from "../middleware/admin.middleware";

const router = Router();

router.get("/", authenticateTokenMiddleware, getAllItineraries);

router.get("/:id", authenticateTokenMiddleware, getItinerariesById);

router.post(
  "/",
  authenticateTokenMiddleware,
  itineraryValidator,
  createItinerary
);

router.put(
  "/:id/edit",
  authenticateTokenMiddleware,
  adminRoleMiddleware,
  itineraryValidator,
  updateItinerary
);
router.delete(
  "/:id/delete",
  authenticateTokenMiddleware,
  adminRoleMiddleware,
  deleteItinerary
);

export default router;
