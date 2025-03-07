import { NextFunction, Request, Response } from "express";
import { sendErrorResponse } from "../utils/response.util";

const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => sendErrorResponse(res, err, "SERVER_ERROR");

export default errorHandler;
