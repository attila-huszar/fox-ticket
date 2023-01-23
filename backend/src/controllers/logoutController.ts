import { Response } from "express";
import { AuthorizedRequest } from "../interfaces/authorizedRequest";
import { OK } from "http-status";

export async function logout(req: AuthorizedRequest, res: Response) {
  const user = req.email;

  res.clearCookie("jwt", { path: "/refresh", httpOnly: true, sameSite: "none", secure: true });
  res.status(OK).json({ success: true, message: `${user} logged out successfully` });
}
