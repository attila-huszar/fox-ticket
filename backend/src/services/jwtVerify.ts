import jwt, { Secret } from 'jsonwebtoken';
import { UserResponse } from '../interfaces/user';

export function verifyAccessToken(token: string): UserResponse | Error {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN as Secret);
    return decoded as UserResponse;
  } catch (error) {
    return error.message as Error;
  }
}

export function verifyRefreshToken(token: string): UserResponse | Error {
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN as Secret);
    return decoded as UserResponse;
  } catch (error) {
    return error.message as Error;
  }
}
