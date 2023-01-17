import { Request, Response, NextFunction } from "express";
import { OK, UNAUTHORIZED } from "http-status";
import { signAccessToken, signRefreshToken } from "../services/jwtSign";
import { mockUsers } from "../services/mockUsers";

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { email, pass } = req.body;
  const user = mockUsers.find(u => {
    return u.email === email && u.pass === pass;
  });

  if (user) {
    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    res.cookie("jwt", refreshToken, { path: "/refresh", httpOnly: true, sameSite: "none", secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 });

    res.status(OK).json({ user: user.email, admin: user.isAdmin, token: accessToken });
  } else {
    res.status(UNAUTHORIZED).json({ success: false, message: "Invalid credentials" });
  }
}
