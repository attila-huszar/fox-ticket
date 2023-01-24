import { Request, Response, NextFunction } from 'express';
import status from 'http-status';
import { HttpError, NotFoundError, ParameterError } from '../errors';
import { fromZodError } from 'zod-validation-error';
import { LoginRequest, LoginResponse, RegisterUserRequest, User } from '../interfaces/user';
import * as userService from '../services/userService';
import { ZodError } from 'zod';

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

export async function loginUser(
  req: Request<unknown, unknown, LoginRequest, unknown>,
  res: Response<LoginResponse>,
  next: NextFunction
): Promise<void> {
  const user = req.body;

  try {
    const result = await userService.loginUser(user);
    res.send({status: "OK", token: result.token});
  } catch (error) {
    if (error instanceof ZodError) {
      next(new HttpError(status.BAD_REQUEST, fromZodError(error).message));
    } else if (error instanceof ParameterError){
      next(new HttpError(status.BAD_REQUEST, error.message));
    } else {      
      next(new HttpError(status.INTERNAL_SERVER_ERROR));
    }
  }
}
