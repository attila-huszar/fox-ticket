import dotenv from "dotenv";
import jwt, { Secret } from "jsonwebtoken";

dotenv.config({ path: "../../.env.local" });

export function accessVerify(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN as Secret);

    return decoded;
  } catch (error: any) {
    return error.message;
  }
}

export function refreshVerify(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN as Secret);

    return decoded;
  } catch (error: any) {
    return error.message;
  }
}
