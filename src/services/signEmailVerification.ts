import dotenv from "dotenv";
import jwt, { Secret } from "jsonwebtoken";
import { User } from "../interfaces/User";

dotenv.config({ path: __dirname + "./../../.env.local" });

export function signEmailVerification(user: User): string {
  return jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN as Secret, { expiresIn: "24h" });
}
