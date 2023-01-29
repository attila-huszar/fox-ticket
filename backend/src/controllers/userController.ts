import { Request, Response, NextFunction } from 'express';
import status from 'http-status';
import { HttpError, ParameterError } from '../errors';
import { fromZodError } from 'zod-validation-error';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterRequestWithToken,
  RegisterResponse,
} from '../interfaces/user';
import { AuthorizedRequest } from '../interfaces/authorizedRequest';
import * as userService from '../services/userService';
import { ZodError } from 'zod';
import { OK, UNAUTHORIZED } from 'http-status';
import { signAccessToken, signRefreshToken } from '../services/jwtSign';

export async function registerUser(
  req: Request<unknown, unknown, RegisterRequestWithToken, unknown>,
  res: Response<RegisterResponse>,
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
  const user: LoginRequest = req.body;

  try {
    const loggedInUser: LoginResponse = await userService.loginUser(user);
    if (loggedInUser) {
      const accessToken = signAccessToken(loggedInUser);
      const refreshToken = signRefreshToken(loggedInUser);

      res.cookie('jwt', refreshToken, {
        path: '/api/refresh',
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.status(OK).json({
        name: loggedInUser.name,
        email: loggedInUser.email,
        isAdmin: loggedInUser.isAdmin,
        isVerified: loggedInUser.isVerified,
        token: accessToken,
      });
    } else {
      res.status(UNAUTHORIZED).json({
        email: user.email,
      });
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

export async function logoutUser(req: AuthorizedRequest, res: Response) {
  const user = req.email;

  res.clearCookie('jwt', {
    path: '/api/refresh',
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });
  res.status(OK).json({ email: user });
}
