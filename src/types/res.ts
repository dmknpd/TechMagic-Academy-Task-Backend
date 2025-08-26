import { Response } from "express";

export interface ApiResponse<T = any> extends Response {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
}
