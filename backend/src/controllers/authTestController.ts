import { Response } from 'express'
import { AuthorizedRequest } from '../interfaces/authorizedRequest'
import { OK } from 'http-status'

export function authTest(req: AuthorizedRequest, res: Response) {
  const user = req.email
  res.status(OK).send(user)
}
