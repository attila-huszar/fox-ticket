import dotenv from "dotenv";
import jwt, { Secret } from "jsonwebtoken";
import { UserJwt } from "../interfaces/User";

dotenv.config({ path: __dirname + "./../../.env.local" });

export function signAccessToken(user: UserJwt): string {
  return jwt.sign({ email: user.email, isAdmin: user.isAdmin }, process.env.ACCESS_TOKEN as Secret, { expiresIn: "10m" });
}

export function signRefreshToken(user: UserJwt): string {
  return jwt.sign({ email: user.email, isAdmin: user.isAdmin }, process.env.REFRESH_TOKEN as Secret, { expiresIn: "30d" });
}

export function signEmailVerification(user: UserJwt): string {
  return jwt.sign({ email: user.email, isAdmin: user.isAdmin }, process.env.ACCESS_TOKEN as Secret, { expiresIn: "24h" });
}
