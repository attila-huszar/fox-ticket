import dotenv from "dotenv";
import { UNAUTHORIZED } from "http-status";
import { Response, NextFunction } from "express";
import { AuthorizedRequest } from "../interfaces/AuthorizedRequest";
import { accessVerify } from "../services/tokenVerify";

dotenv.config({ path: __dirname + "./../../.env.local" });

export function auth(req: AuthorizedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    const decoded = accessVerify(token);

    if (decoded instanceof Error || !decoded.hasOwnProperty("email")) return res.status(UNAUTHORIZED).json({ redirect: true, message: decoded });

    req.email = decoded.email;
    next();
  } else {
    res.status(UNAUTHORIZED).json({ redirect: true, message: "Invalid Credentials" });
  }
}
