import { Request, Response, NextFunction } from "express";
import { OK, UNAUTHORIZED } from "http-status";
import { verifyRefreshToken } from "../services/jwtVerify";
import { signAccessToken, signRefreshToken } from "../services/jwtSign";
import { User } from "../interfaces/user";

export async function refresh(req: Request, res: Response, next: NextFunction) {
  const cookie = req.headers.cookie?.split("=")[1];

  if (cookie) {
    const decoded = verifyRefreshToken(cookie);

    if (decoded instanceof Error || !decoded.hasOwnProperty("email"))
      return res
        .status(UNAUTHORIZED)
        .json({ success: false, message: decoded });

    const user: User = { email: decoded.email, isAdmin: decoded.isAdmin };

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    res.cookie("jwt", refreshToken, {
      path: "/refresh",
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res
      .status(OK)
      .json({ user: user.email, admin: user.isAdmin, token: accessToken });
  } else {
    res.status(UNAUTHORIZED).json({ success: false, message: "Unauthorized" });
  }
}
