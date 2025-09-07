import { Router } from "express";
import { authenticateTokenMiddleware } from "../middleware/auth.middleware";
import {
  createTour,
  deleteTour,
  getAllTours,
} from "../controllers/tour.controller";

const router = Router();

router.get("/", authenticateTokenMiddleware, getAllTours);

router.post("/create", authenticateTokenMiddleware, createTour);

router.delete("/:id/delete", authenticateTokenMiddleware, deleteTour);

export default router;
