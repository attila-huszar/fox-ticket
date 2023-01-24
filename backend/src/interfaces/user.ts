import * as userRepo from '../repositories/userRepo';
import { z } from 'zod';

export const RegisterUserRequestValidator = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email().min(1, 'Email is required'),
    password: z.string().min(8, 'Password must be at least 8 characters.'),
  })
  .refine(async userRequest => {
    const user = await userRepo.getUserByEmail(userRequest.email);
    return !user;
  }, 'Email is already taken');

export type RegisterUserRequest = z.infer<typeof RegisterUserRequestValidator>;

export interface UserResponse {
  id?: number;
  name?: string;
  email: string;
  password?: string;
  isAdmin?: boolean;
  isVerified?: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean
  token: string
}