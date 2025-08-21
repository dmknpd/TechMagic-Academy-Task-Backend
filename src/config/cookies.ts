import { CookieOptions } from "express";

import { isProd } from "./config";

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: isProd,
  maxAge: 7 * 24 * 60 * 60 * 1000, //7days
};
