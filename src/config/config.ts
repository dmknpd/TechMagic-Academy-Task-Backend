import dotenv from "dotenv";
dotenv.config();

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;
export const ACCESS_TOKEN_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES as string;
export const REFRESH_TOKEN_EXPIRES = process.env
  .REFRESH_TOKEN_EXPIRES as string;

export const MONGO_URI = process.env.MONGO_URI as string;
export const FRONTEND_HOST = process.env.FRONTEND_HOST;
export const PORT = process.env.PORT;

export const isProd = process.env.NODE_ENV === "production";
