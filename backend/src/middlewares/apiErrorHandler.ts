import { Request, Response, NextFunction } from 'express'
import { logger } from '../logger'
import { HttpError } from '../errors'
import { ErrorResponse } from '../interfaces/error'

export default function apiErrorHandler(
  err: HttpError,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction,
): void {
  logger.error(err.stack)

  if (res.headersSent) {
    next(err)
    return
  }

  res.status(err.statusCode).send({ message: err.message })
}
