import { Response, NextFunction } from "express";
import { AuthorizedRequest } from "../interfaces/AuthorizedRequest";

export async function home(req: AuthorizedRequest, res: Response, next: NextFunction) {
  const user = req.email;
  res.send(`<h2>Welcome ${user}</h2>`);
}
