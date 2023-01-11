import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import jwt, { Secret } from "jsonwebtoken";
import { ParsedQs } from "qs";
import { generateAccessToken, generateRefreshToken } from "./tokenSign";

export function refreshTokenVerify(req: Request<ParamsDictionary, unknown, unknown, ParsedQs, Record<string, unknown>>, res: Response<unknown, Record<string, unknown>>) {
  const refreshToken = req.headers.cookie?.split("=")[1];

  if (refreshToken) {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN as Secret, (err: any, user: any) => {
      if (err) {
        return res.status(403).json({ message: "Invalid Token" });
      } else {
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.json({ accessToken });
        res.cookie("jwt", refreshToken, { path: "/refresh", httpOnly: true, sameSite: "none", secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
      }
    });
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
}
