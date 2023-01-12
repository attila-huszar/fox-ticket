import dotenv from "dotenv";
import { Response, NextFunction } from "express";
import status from "http-status";
import { AuthorizedRequest } from "../interfaces/AuthorizedRequest";
import { JwtUser } from "../interfaces/JwtUser";
import { accessVerify } from "../services/tokenVerify";

dotenv.config({ path: "../../.env" });

export function auth(req: AuthorizedRequest, res: Response, next: NextFunction) {
  const authHeader = req.Headers.Authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    const user = accessVerify(token) as JwtUser;

    req.email = user.email;
    next();
  } else {
    res.status(status.UNAUTHORIZED).json({ message: "Invalid credentials" });
  }
}
