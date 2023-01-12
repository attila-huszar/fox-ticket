import { Request, Response, NextFunction } from "express";
import status from "http-status";
import { refreshVerify } from "../services/tokenVerify";
import { signAccessToken, signRefreshToken } from "../services/tokenSign";
import { JwtUser } from "../interfaces/JwtUser";
import { User } from "../interfaces/User";

export async function refresh(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.cookie?.split("=")[1];

  if (token) {
    const decoded = refreshVerify(token) as JwtUser;

    if ((decoded as unknown) === "invalid token") return res.status(403).json({ message: "Invalid Token" });

    const user: User = { email: decoded.email, role: decoded.role };

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    res.cookie("jwt", refreshToken, { path: "/refresh", httpOnly: true, sameSite: "none", secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
    res.status(status.OK).json({ accessToken });
  } else {
    res.status(status.UNAUTHORIZED).json({ message: "Unauthorized" });
  }
}
