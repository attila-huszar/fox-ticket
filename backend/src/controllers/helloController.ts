import { Request, Response, NextFunction } from 'express';
import status from 'http-status';
import { HttpError, NotFoundError, ParameterError } from '../errors';
import { HelloWorldRequest } from '../interfaces/helloWorld';
import * as helloService from '../services/helloService';

export async function getHelloWorld(
  req: Request<unknown, unknown, unknown, HelloWorldRequest>,
  res: Response,
  next: NextFunction
): Promise<void> {
  const personId = Number(req.query.personId);

  try {
    const data = await helloService.getHelloWorld(personId)
    res.send(data);
  } catch (error) {
    if (error instanceof ParameterError) {
      next(new HttpError(status.BAD_REQUEST, error.message));
    }
    if (error instanceof NotFoundError) {
      next(new HttpError(status.NOT_FOUND));
    }
  }
}
