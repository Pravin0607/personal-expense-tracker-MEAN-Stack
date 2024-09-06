
import { NextFunction, Request, Response } from 'express';

// Define a standard format for error responses
interface ApiErrorResponse {
  success: boolean;
  errorCode: number;
  message: string;
  error?: any;
}

// Error handling middleware
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
  console.error(err.stack);

  const errorCode = err.code || 500;
  const message = err.message || 'Internal Server Error';

  const response: ApiErrorResponse = {
    success: false,
    errorCode: errorCode,
    message: message
  };

  res.status(errorCode).json(response);
}