import * as userRepo from "../repositories/userRepo";
import { z } from "zod";

export const RegisterUserRequestValidator = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(100, "Must be 100 or fewer characters long"),
    email: z.string().email("Invalid email address").trim(),
    password: z
      .string()
      .min(8, "Must be 8 or more characters long")
      .max(255, "Must be 255 or fewer characters long"),
  })
  .refine(async userRequest => {
    const user = await userRepo.getUserByEmail(userRequest.email);
    return !user;
  }, "Email address is already registered");

export type RegisterUserRequest = z.infer<typeof RegisterUserRequestValidator>;

export interface User {
  id?: number;
  name?: string;
  email: string;
  password?: string;
  isAdmin?: boolean;
  isVerified?: boolean;
}
