import dotenv from "dotenv";
dotenv.config();

export const MONGO_URI = process.env.MONGO_URI as string;
export const FRONTEND_HOST = process.env.FRONTEND_HOST;
export const PORT = process.env.PORT;
