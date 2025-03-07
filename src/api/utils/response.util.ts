import { Response } from "express";
import { ZodError } from "zod";
import { ERROR_RESPONSES } from "../constants/error.const";
import { TStatusCode } from "../types/response.type";
import { formatZodError } from "./zod.util";

export const sendResponse = (
  res: Response,
  data: any,
  statusCode?: TStatusCode
) => {
  return res.status(statusCode || 200).json({ data: data }) as any;
};

export const sendErrorResponse = (
  res: Response,
  error: any,
  errorKey?: keyof typeof ERROR_RESPONSES // Only allow predefined errors
) => {
  if (error instanceof ZodError) {
    return res.status(400).json({
      status: "fail",
      message: ERROR_RESPONSES.VALIDATION_ERROR.message,
      errors: formatZodError(error),
    });
  }

  const errorResponse = ERROR_RESPONSES[errorKey || "SERVER_ERROR"];

  return res.status(errorResponse.status).json({
    status: "error",
    message: errorResponse.message,
    errors: [error?.message || error],
  }) as any;
};
