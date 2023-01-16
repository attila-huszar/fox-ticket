import dotenv from "dotenv";
import jwt, { Secret } from "jsonwebtoken";
import { User } from "../interfaces/User";

dotenv.config({ path: __dirname + "./../../.env.local" });

export function accessVerify(token: string): User | Error {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN as Secret);
    return decoded as User;
  } catch (error: any) {
    return error.message as Error;
  }
}

export function refreshVerify(token: string): User | Error {
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN as Secret);
    return decoded as User;
  } catch (error: any) {
    return error.message as Error;
  }
}
