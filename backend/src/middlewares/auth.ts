import { Response, NextFunction } from 'express'
import { verifyAccessToken } from '../services/jwtVerify'
import { AuthorizedRequest } from '../interfaces/authorizedRequest'
import { UNAUTHORIZED } from 'http-status'

export function auth(
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization

  if (token) {
    const decoded = verifyAccessToken(token)

    if (decoded instanceof Error || !('email' in decoded))
      return res.status(UNAUTHORIZED).json({ refresh: true, message: decoded })

    req.email = decoded.email
    next()
  } else {
    res
      .status(UNAUTHORIZED)
      .json({ refresh: true, message: 'Invalid Credentials' })
  }
}
