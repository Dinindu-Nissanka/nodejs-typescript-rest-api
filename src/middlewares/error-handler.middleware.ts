import HttpException from '../exceptions/http.exception';
import { Request, Response, NextFunction } from 'express';
import Logger from '../utils/logger';
import { ErrorResponse } from '../types/error-response.type';

export const errorHandlerMiddleware = (
  exception: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const status = exception.statusCode || exception.status || 500;
  const message = exception.message || 'Something went wrong';

  let errorResponse: ErrorResponse = {
    status,
    message,
  };

  if (exception.errors) {
    errorResponse = {
      ...errorResponse,
      errors: exception.errors,
    };
  }

  Logger.error(`${exception.message} : ${exception.errors}`);

  response.status(status).send(errorResponse);
};
