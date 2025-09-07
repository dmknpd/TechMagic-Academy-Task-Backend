import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import { MONGO_URI, PORT } from "./config/config";

import authRoutes from "./routes/auth.routes";
import clientRoutes from "./routes/client.routes";
import itineraryRoutes from "./routes/itinerary.routes";
import tourRoutes from "./routes/tour.routes";
import discountsRoutes from "./routes/discount.routes";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: `${process.env.FRONTEND_HOST}`,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/itineraries", itineraryRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/discounts", discountsRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
