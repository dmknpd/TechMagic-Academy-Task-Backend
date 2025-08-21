import { Request, Response } from "express";

import User from "../models/user.model";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.utils";

import { cookieOptions } from "../config/cookies";

export const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });

    if (existing) {
      res.status(400).json({
        errors: { email: ["Email already used"] },
      });
      return;
    }

    const user = new User({ firstName, lastName, email, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
    return;
  } catch (error: any) {
    res.status(500).json({ message: `Registration error: ${error.message}` });
    return;
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const emailLowerCase = email.toLowerCase();

    const user = await User.findOne({ email: emailLowerCase });

    if (!user || !(await user.comparePassword(password))) {
      res
        .status(400)
        .json({ errors: { email: ["User doesn't exist or wrong password"] } });
      return;
    } else {
      const refreshToken = generateRefreshToken(user._id, user.email);
      const accessToken = generateAccessToken(user._id, user.email);

      user.refreshTokens.push(refreshToken);
      await user.save();

      res.cookie("jwt", refreshToken, cookieOptions);

      res.status(200).json({ accessToken });
      return;
    }
  } catch (error: any) {
    res.status(500).json({ message: `Login error: ${error.message}` });
    return;
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    res.status(401).json({ message: "Please login to continue" });
    return;
  }

  const refreshTokenFromCookie = cookies.jwt;

  try {
    const decoded = verifyRefreshToken(refreshTokenFromCookie);

    const user = await User.findById(decoded.userId);
    if (!user) {
      res.status(401).json({ message: "User not found (unauthorized)" });
      return;
    } else if (!user?.refreshTokens.includes(refreshTokenFromCookie)) {
      res.status(403).json({ message: "Access denied" });
      return;
    } else {
      const newRefreshToken = generateRefreshToken(user._id, user.email);
      const newAccessToken = generateAccessToken(user._id, user.email);

      user.refreshTokens = user.refreshTokens.filter(
        (token) => token != refreshTokenFromCookie
      );

      user.refreshTokens.push(newRefreshToken);

      await user.save();

      res.cookie("jwt", newRefreshToken, cookieOptions);

      res.status(200).json({ accessToken: newAccessToken });
      return;
    }
  } catch (error: any) {
    console.error(error.message);
    res.status(401).json({ message: "Please login to continue" });
    return;
  }
};

export const logout = async (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    res.sendStatus(204);
    return;
  }

  const refreshTokenFromCookie = cookies.jwt;

  try {
    const decoded = verifyRefreshToken(refreshTokenFromCookie);

    const user = await User.findById(decoded.userId);
    if (!user) {
      res.clearCookie("jwt", cookieOptions);
      res.sendStatus(204);
      return;
    } else {
      user.refreshTokens = user.refreshTokens.filter(
        (token) => token != refreshTokenFromCookie
      );

      await user.save();

      res.clearCookie("jwt", cookieOptions);
      res.status(200).json({ message: "Logged out successfully" });
      return;
    }
  } catch (error: any) {
    res.status(500).json({ message: `Logout error: ${error.message}` });
    return;
  }
};
