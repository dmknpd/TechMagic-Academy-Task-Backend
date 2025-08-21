import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import { MONGO_URI, PORT } from "./config/config";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: `${process.env.FRONTEND_HOST}`,
    credentials: true,
  })
);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
