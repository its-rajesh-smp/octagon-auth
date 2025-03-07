import { NextFunction, Request, Response } from "express";
import { verifyJWTToken } from "../utils/jwt.util";
import { sendErrorResponse } from "../utils/response.util";

export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return sendErrorResponse(
      res,
      new Error("Authorization header missing"),
      "UNAUTHORIZED"
    );
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = verifyJWTToken(token);

    const { email, id } = decoded as { email: string; id: string };

    req.user = {
      email,
      id,
    };

    next();
  } catch (error) {
    return sendErrorResponse(res, error, "VALIDATION_ERROR");
  }
};

export default { AuthMiddleware };
