import dotenv from "dotenv";
import jwt, { Secret } from "jsonwebtoken";
import { UserJwt } from "../interfaces/User";

dotenv.config({ path: __dirname + "./../../.env.local" });

export function verifyAccessToken(token: string): UserJwt | Error {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN as Secret);
    return decoded as UserJwt;
  } catch (error: any) {
    return error.message as Error;
  }
}

export function verifyRefreshToken(token: string): UserJwt | Error {
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN as Secret);
    return decoded as UserJwt;
  } catch (error: any) {
    return error.message as Error;
  }
}
