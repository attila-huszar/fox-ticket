import dotenv from "dotenv";
import jwt, { Secret } from "jsonwebtoken";

dotenv.config({ path: "../../.env" });

export function accessVerify(token: string): string | jwt.JwtPayload | Error {
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN as Secret);
  if (!decoded) throw new Error("Invalid Token");
  return decoded;
}

export function refreshVerify(token: string): string | jwt.JwtPayload | Error {
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN as Secret);
    return decoded;
  } catch (error: any) {
    return error.message;
  }
}
