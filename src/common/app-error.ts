import { HttpCode } from "./enums/http-code";

interface AppErrorArgs {
  name?: string;
  statusCode: HttpCode;
  message: string;
  isOperational?: boolean;
  details?: Record<any, any>;
}

export class AppError extends Error {
  public readonly name: string;
  public readonly statusCode: HttpCode;
  public readonly isOperational: boolean = true;
  public readonly details?: Record<any, any>;

  constructor(args: AppErrorArgs) {
    const { message, name, statusCode, isOperational, details } = args;
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name ?? "Aplication Error";
    this.statusCode = statusCode;
    if (isOperational !== undefined) this.isOperational = isOperational;
    this.details = details;
    Error.captureStackTrace(this);
  }

  static badRequest(message: string, details?: Record<any, any>): AppError {
    return new AppError({
      name: "BadRequestError",
      message,
      statusCode: HttpCode.BAD_REQUEST,
      details,
    });
  }

  static unauthorized(message: string, details?: Record<any, any>): AppError {
    return new AppError({
      name: "UnauthorizedError",
      message,
      statusCode: HttpCode.UNAUTHORIZED,
      details,
    });
  }

  static forbidden(message: string, details?: Record<any, any>): AppError {
    return new AppError({
      name: "ForbiddenError",
      message,
      statusCode: HttpCode.FORBIDDEN,
      details,
    });
  }

  static notFound(message: string, details?: Record<any, any>): AppError {
    return new AppError({
      name: "NotFoundError",
      message,
      statusCode: HttpCode.NOT_FOUND,
      details,
    });
  }

  static internalServer(message: string, details?: Record<any, any>): AppError {
    return new AppError({
      name: "InternalServerError",
      message,
      statusCode: HttpCode.INTERNAL_SERVER_ERROR,
      details,
    });
  }
}
