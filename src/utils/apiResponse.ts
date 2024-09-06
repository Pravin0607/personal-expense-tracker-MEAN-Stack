import { Response } from 'express';

function sendApiResponse(res: Response, data: any, statusCode: number, message: string) {
  res.status(statusCode).json({
    success: true,
    message,
    data
  });
}

export default sendApiResponse;
