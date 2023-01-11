import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";

dotenv.config({ path: "../.env" });

export interface userAuth extends Request {
  user?: string;
}

export function auth(req: userAuth, res: Response, next: NextFunction) {
  const authHeader = req.headers.Authorization as string;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN as Secret, (err: any, user: any) => {
      if (err) {
        return res.status(403).json({ message: "Invalid Token" });
      }

      req.user = user.name;
      next();
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
}
