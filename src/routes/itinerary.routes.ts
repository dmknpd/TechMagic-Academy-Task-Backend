import { Router } from "express";
import { authenticateTokenMiddleware } from "../middleware/auth.middleware";

import {
  createItinerary,
  getAllItineraries,
  getItinerariesByCountry,
} from "../controllers/itinerary.controller";
import { itineraryValidator } from "../middleware/validation.middleware";

const router = Router();

router.get("/search", authenticateTokenMiddleware, getItinerariesByCountry);

router.get("/", authenticateTokenMiddleware, getAllItineraries);

router.post(
  "/create",
  authenticateTokenMiddleware,
  itineraryValidator,
  createItinerary
);

export default router;
