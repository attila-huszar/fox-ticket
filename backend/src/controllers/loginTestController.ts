import { Response, NextFunction } from "express";
import { AuthorizedRequest } from "../interfaces/AuthorizedRequest";
import { OK } from "http-status";

export async function home(req: AuthorizedRequest, res: Response, next: NextFunction) {
  const user = req.email;
  res.status(OK).send(`<h2>Welcome ${user}</h2>`);
}
