import { Request, Response, NextFunction } from "express";
import { AuthorizedRequest } from "../interfaces/AuthorizedRequest";

export async function logout(req: AuthorizedRequest, res: Response, next: NextFunction): Promise<void> {
  const user = req.email;

  res.clearCookie("jwt", { path: "/refresh", httpOnly: true, sameSite: "none", secure: true });
  res.status(200).json({ message: `${user} logged out successfully` });
}
