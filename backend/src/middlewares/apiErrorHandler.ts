import { Request, Response, NextFunction } from 'express';
import status from 'http-status';
import logger from '../logger';
import { HttpError } from '../errors';
import { ErrorResponse } from '../interfaces/error';

export default function apiErrorHandler(
  err: HttpError,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
): void {
  logger.error(err.stack);

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode).send({ message: err.message });
}
