import { Response, NextFunction } from 'express';
import { AuthorizedRequest } from '../interfaces/authorizedRequest';
import { OK } from 'http-status';

export async function authTest(
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction
) {
  const user = req.email;
  res.status(OK).send(user);
}
