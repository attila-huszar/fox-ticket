import dotenv from "dotenv";
import jwt, { Secret } from "jsonwebtoken";
import { User } from "../services/mockUsers";

dotenv.config({ path: "../.env" });

export const generateAccessToken = (user: User) => {
  return jwt.sign({ email: user.email, role: user.role }, process.env.ACCESS_TOKEN as Secret, { expiresIn: "10m" });
};

export const generateRefreshToken = (user: User) => {
  return jwt.sign({ name: user.email, role: user.role }, process.env.REFRESH_TOKEN as Secret, { expiresIn: "30d" });
};
