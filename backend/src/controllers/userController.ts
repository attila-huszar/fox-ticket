import { Request, Response, NextFunction } from 'express';
import status from 'http-status';
import { HttpError, NotFoundError, ParameterError } from '../errors';
import { RegisterUserRequest, User } from '../interfaces/user';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';
import * as userService from '../services/userService';

export async function registerUser(
  req: Request<unknown, unknown, RegisterUserRequest, unknown>,
  res: Response<User>,
  next: NextFunction
): Promise<void> {
  const user = req.body;

  try {
    const result = await userService.registerUser(user);
    res.send(result);
  } catch (error) {
    if (error instanceof ZodError) {
      next(new HttpError(status.BAD_REQUEST, fromZodError(error).message));
    } else {
      next(new HttpError(status.INTERNAL_SERVER_ERROR));
    }
  }
}
