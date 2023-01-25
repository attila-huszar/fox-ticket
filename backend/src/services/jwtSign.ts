import dotenv from "dotenv";
import jwt, { Secret } from "jsonwebtoken";
import { RegisterResponse } from "../interfaces/user";

dotenv.config({ path: __dirname + "./../../.env.local" });

export function signAccessToken(user: RegisterResponse): string {
  return jwt.sign(
    { email: user.email, isAdmin: user.isAdmin },
    process.env.ACCESS_TOKEN as Secret,
    { expiresIn: "10m" }
  );
}

export function signRefreshToken(user: RegisterResponse): string {
  return jwt.sign(
    { email: user.email, isAdmin: user.isAdmin },
    process.env.REFRESH_TOKEN as Secret,
    { expiresIn: "30d" }
  );
}

export function signEmailVerification(user: RegisterResponse): string {
  return jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN as Secret, {
    expiresIn: "24h",
  });
}
