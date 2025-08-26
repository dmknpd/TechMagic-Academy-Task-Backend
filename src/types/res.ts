import { Response } from "express";

interface ApiResponseData<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export type ApiResponse<T = any> = Response<ApiResponseData<T>>;
