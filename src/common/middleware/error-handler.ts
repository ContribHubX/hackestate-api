import { Request, Response, NextFunction } from "express";
import { AppError } from "../app-error";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const status =  err instanceof AppError ? err.statusCode : 500;

  const message = err.message || "Internal Server Error";

  console.log(err);

  res.status(status).json({
    name: err.name,
    status,
    message,
    details: err.details || []
  });
}
