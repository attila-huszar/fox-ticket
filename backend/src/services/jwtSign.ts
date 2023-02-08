import jwt, { Secret } from 'jsonwebtoken';
import { RegisterResponse, VerificationRequest, VerificationResponse } from '../interfaces/user';

export function signAccessToken(user: RegisterResponse): string {
  return jwt.sign(
    { email: user.email, isAdmin: user.isAdmin },
    process.env.ACCESS_TOKEN as Secret,
    { expiresIn: '60m' }
  );
}

export function signRefreshToken(user: RegisterResponse): string {
  return jwt.sign(
    { email: user.email, isAdmin: user.isAdmin },
    process.env.REFRESH_TOKEN as Secret,
    { expiresIn: '30d' }
  );
}

export function signEmailVerification(user: VerificationRequest): string {
  return jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN as Secret, {
    expiresIn: '24h',
  });
}
