import { Request, Response, NextFunction } from 'express';
import status from 'http-status';
import { HttpError, ParameterError } from '../errors';
import { fromZodError } from 'zod-validation-error';
import {
  LoginRequest,
  LoginResponse,
  RegisterUserRequest,
  UserResponse,
} from '../interfaces/user';
import * as userService from '../services/userService';
import { ZodError } from 'zod';
import { OK, UNAUTHORIZED } from 'http-status';
import { signAccessToken, signRefreshToken } from '../services/jwtSign';

export async function registerUser(
  req: Request<unknown, unknown, RegisterUserRequest, unknown>,
  res: Response<UserResponse>,
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
    await userService.loginUser(user);
    if (user) {
      const accessToken = signAccessToken(user);
      const refreshToken = signRefreshToken(user);

      res.cookie('jwt', refreshToken, {
        path: '/api/refresh',
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.status(OK).json({ success: true, token: accessToken });
    } else {
      res.status(UNAUTHORIZED).json({ success: false, token: '' });
    }
  } catch (error) {
    if (error instanceof ZodError) {
      next(new HttpError(status.BAD_REQUEST, fromZodError(error).message));
    } else if (error instanceof ParameterError) {
      next(new HttpError(status.BAD_REQUEST, error.message));
    } else {
      next(new HttpError(status.INTERNAL_SERVER_ERROR));
    }
  }
}
