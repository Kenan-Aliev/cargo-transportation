import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils";

export const exceptionMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    if (err instanceof ApiError) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  } else {
    next();
  }
};
