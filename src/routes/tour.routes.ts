import { Router } from "express";
import { authenticateTokenMiddleware } from "../middleware/auth.middleware";
import { createTour, getAllTours } from "../controllers/tour.controller";

const router = Router();

// router.get("/search", authenticateTokenMiddleware, getItinerariesByCountry);

router.get("/", authenticateTokenMiddleware, getAllTours);

router.post("/create", authenticateTokenMiddleware, createTour);

export default router;
