import jwt, { JwtPayload } from "jsonwebtoken";

import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/config";

interface TokenPayload extends JwtPayload {
  userId: string;
  email: string;
  role: "user" | "admin";
}

export const generateAccessToken = (
  userId: string,
  email: string,
  role: "user" | "admin"
): string => {
  return jwt.sign({ userId, email, role }, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (
  userId: string,
  email: string,
  role: "user" | "admin"
): string => {
  return jwt.sign({ userId, email, role }, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET) as TokenPayload;
};
