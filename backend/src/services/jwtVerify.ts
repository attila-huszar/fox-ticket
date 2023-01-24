import jwt, { Secret } from 'jsonwebtoken';
import { RegisterResponse } from '../interfaces/user';

export function verifyAccessToken(token: string): RegisterResponse | Error {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN as Secret);
    return decoded as RegisterResponse;
  } catch (error) {
    return error.message as Error;
  }
}

export function verifyRefreshToken(token: string): RegisterResponse | Error {
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN as Secret);
    return decoded as RegisterResponse;
  } catch (error) {
    return error.message as Error;
  }
}
