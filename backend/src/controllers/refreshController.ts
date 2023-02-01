import { Request, Response, NextFunction } from 'express';
import { OK, UNAUTHORIZED } from 'http-status';
import { verifyRefreshToken } from '../services/jwtVerify';
import { signAccessToken, signRefreshToken } from '../services/jwtSign';
import { RegisterResponse } from '../interfaces/user';

export async function refresh(req: Request, res: Response, next: NextFunction) {
  const cookie = req.headers.cookie?.split('=')[1];

  if (cookie) {
    const decoded = verifyRefreshToken(cookie);

    if (decoded instanceof Error || !decoded.hasOwnProperty('email'))
      return res
        .status(UNAUTHORIZED)
        .json({ success: false, message: decoded });

    const user: RegisterResponse = { email: decoded.email, isAdmin: decoded.isAdmin };

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    res.cookie('jwt', refreshToken, {
      path: '/api/refresh',
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res
      .status(OK)
      .json({ token: accessToken });
  } else {
    res.status(UNAUTHORIZED).json({ success: false, message: 'Unauthorized' });
  }
}
