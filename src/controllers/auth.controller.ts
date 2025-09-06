import { Request } from "express";

import User from "../models/user.model";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.utils";

import { cookieOptions } from "../config/cookies";
import { ApiResponse } from "../types/res";

export const register = async (req: Request, res: ApiResponse) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });

    if (existing) {
      res.status(400).json({
        success: false,
        errors: { email: ["Email already used"] },
      });
      return;
    }

    const user = new User({ firstName, lastName, email, password });
    await user.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
    return;
  } catch (error: any) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: `Registration error: ${error.message}`,
    });
    return;
  }
};

export const login = async (
  req: Request,
  res: ApiResponse<{ accessToken: string }>
) => {
  const { email, password } = req.body;
  try {
    const emailLowerCase = email.toLowerCase();

    const user = await User.findOne({ email: emailLowerCase });

    if (!user || !(await user.comparePassword(password))) {
      res.status(400).json({
        success: false,
        errors: { email: ["User doesn't exist or wrong password"] },
      });
      return;
    }

    const refreshToken = generateRefreshToken(user._id, user.email, user.role);
    const accessToken = generateAccessToken(user._id, user.email, user.role);

    user.refreshTokens.push(refreshToken);
    await user.save();

    res.cookie("jwt", refreshToken, cookieOptions);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: { accessToken },
    });
    return;
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: `Login error: ${error.message}`,
    });
    return;
  }
};

export const refreshToken = async (
  req: Request,
  res: ApiResponse<{ accessToken: string }>
) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    res.status(401).json({
      success: false,
      message: "Please login to continue",
    });
    return;
  }

  const refreshTokenFromCookie = cookies.jwt;

  try {
    const decoded = verifyRefreshToken(refreshTokenFromCookie);

    const user = await User.findById(decoded.userId);
    if (!user) {
      res.status(401).json({
        success: false,
        message: "User not found (unauthorized)",
      });
      return;
    }

    if (!user.refreshTokens.includes(refreshTokenFromCookie)) {
      res.status(403).json({
        success: false,
        message: "Access denied",
      });
      return;
    }

    const newRefreshToken = generateRefreshToken(
      user._id,
      user.email,
      user.role
    );
    const newAccessToken = generateAccessToken(user._id, user.email, user.role);

    user.refreshTokens = user.refreshTokens.filter((token) => {
      try {
        verifyRefreshToken(token);
        return true;
      } catch {
        return false;
      }
    });

    user.refreshTokens.push(newRefreshToken);

    await user.save();

    res.cookie("jwt", newRefreshToken, cookieOptions);

    res.status(200).json({
      success: true,
      data: { accessToken: newAccessToken },
    });
    return;
  } catch (error: any) {
    console.error("Refresh error:", error);
    res.status(401).json({
      success: false,
      message: "Please login to continue",
    });
    return;
  }
};

export const logout = async (req: Request, res: ApiResponse) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    res.status(204).json({
      success: true,
      message: "No active session",
    });
    return;
  }

  const refreshTokenFromCookie = cookies.jwt;

  try {
    const decoded = verifyRefreshToken(refreshTokenFromCookie);

    const user = await User.findById(decoded.userId);
    if (!user) {
      res.clearCookie("jwt", cookieOptions);
      res.status(204).json({
        success: true,
        message: "No active session",
      });
      return;
    }

    user.refreshTokens = user.refreshTokens.filter(
      (token) => token !== refreshTokenFromCookie
    );

    await user.save();

    res.clearCookie("jwt", cookieOptions);
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
    return;
  } catch (error: any) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: `Logout error: ${error.message}`,
    });
    return;
  }
};
