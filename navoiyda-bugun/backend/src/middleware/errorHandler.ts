import { Request, Response, NextFunction } from "express";
import { ApiError } from "../types";

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  error: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = 500;
  let message = "Serverda xatolik yuz berdi";

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error.name === "ValidationError") {
    statusCode = 400;
    message = "Ma'lumotlar noto'g'ri";
  } else if (error.name === "CastError") {
    statusCode = 400;
    message = "Noto'g'ri ID format";
  } else if (error.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Noto'g'ri token";
  } else if (error.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token muddati tugagan";
  }

  console.error("Error:", error);

  const response: ApiError = {
    message,
    statusCode,
    ...(process.env["NODE_ENV"] === "development" && { details: error.stack }),
  };

  res.status(statusCode).json({
    success: false,
    error: response,
  });
};

export const notFound = (req: Request, _res: Response, next: NextFunction) => {
  const error = new AppError(`${req.originalUrl} yo'l topilmadi`, 404);
  next(error);
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
