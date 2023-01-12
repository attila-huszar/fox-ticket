import dotenv from "dotenv";
import jwt, { Secret } from "jsonwebtoken";
import { User } from "../interfaces/User";

dotenv.config({ path: "../../.env" });

export function signAccessToken(user: User) {
  return jwt.sign({ email: user.email, role: user.role }, process.env.ACCESS_TOKEN as Secret, { expiresIn: "10m" });
}

export function signRefreshToken(user: User) {
  return jwt.sign({ email: user.email, role: user.role }, process.env.REFRESH_TOKEN as Secret, { expiresIn: "30d" });
}
