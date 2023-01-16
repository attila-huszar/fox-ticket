import dotenv from "dotenv";
import { Response, NextFunction } from "express";
import status from "http-status";
import { AuthorizedRequest } from "../interfaces/AuthorizedRequest";
import { JwtUser } from "../interfaces/JwtUser";
import { accessVerify } from "../services/tokenVerify";

dotenv.config({ path: "../../.env.local" });

export function auth(req: AuthorizedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    const decoded: JwtUser | Error = accessVerify(token) as JwtUser;

    if (decoded instanceof Error || !decoded.hasOwnProperty("email")) return res.status(status.FORBIDDEN).json({ message: "Invalid Token" });

    req.email = decoded.email;
    next();
  } else {
    res.status(status.UNAUTHORIZED).json({ message: "Invalid credentials" });
  }
}
