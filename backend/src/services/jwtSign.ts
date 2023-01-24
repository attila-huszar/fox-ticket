import jwt, { Secret } from 'jsonwebtoken';
import { UserResponse } from '../interfaces/user';

export function signAccessToken(user: UserResponse): string {
  return jwt.sign(
    { email: user.email, isAdmin: user.isAdmin },
    process.env.ACCESS_TOKEN as Secret,
    { expiresIn: '10m' }
  );
}

export function signRefreshToken(user: UserResponse): string {
  return jwt.sign(
    { email: user.email, isAdmin: user.isAdmin },
    process.env.REFRESH_TOKEN as Secret,
    { expiresIn: '30d' }
  );
}

export function signEmailVerification(user: UserResponse): string {
  return jwt.sign(
    { email: user.email, isAdmin: user.isAdmin },
    process.env.ACCESS_TOKEN as Secret,
    { expiresIn: '24h' }
  );
}
