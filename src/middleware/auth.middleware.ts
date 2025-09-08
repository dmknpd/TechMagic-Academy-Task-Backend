import { Response, NextFunction } from "express";

import { verifyAccessToken } from "../utils/jwt.utils";
import { RequestWithUserId } from "../types/req";
import { ApiResponse } from "../types/res";

export const authenticateTokenMiddleware = (
  req: RequestWithUserId,
  res: ApiResponse,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Please log in to continue",
    });
    return;
  }

  try {
    const user = verifyAccessToken(token);
    req.userId = user.userId;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Please log in to continue",
    });
  }
};
