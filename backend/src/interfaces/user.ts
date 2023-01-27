import * as userRepo from '../repositories/userRepo';
import { z } from 'zod';

export const RegisterRequest = z
  .object({
    name: z.string().min(1, 'Name is required').max(50, 'Max 50 characters'),
    email: z
      .string()
      .email('Must be a valid email address')
      .min(1, 'Email is required')
      .max(254, 'Max 254 characters')
      .trim(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(254, 'Max 254 characters'),
  })
  .refine(async regRequest => {
    const user = await userRepo.getUserByEmail(regRequest.email);
    return !user;
  }, 'Account already exists');

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type RegisterRequest = z.infer<typeof RegisterRequest>;

export interface RegisterRequestWithToken {
  name: string;
  email: string;
  password: string;
  verificationToken: string;
}

export interface RegisterResponse {
  id?: number;
  name?: string;
  email: string;
  isAdmin?: boolean;
  isVerified?: boolean;
}

export interface LoginRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  name?: string;
  email: string;
  isAdmin?: boolean;
  isVerified?: boolean;
  token?: string;
}

export interface VerificationRequest {
  name: string;
  email: string;
}

export interface VerificationResponse {
  message: string;
  name?: string;
  email?: string;
  isVerified?: boolean;
}
