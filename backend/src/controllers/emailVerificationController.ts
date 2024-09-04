import { Request, Response, NextFunction } from 'express'
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from 'http-status'
import { HttpError, NotFoundError, ParameterError } from '../errors'
import { VerificationResponse } from '../interfaces/user'
import { getUserByVerToken, setUserVerified } from '../repositories/userRepo'

export function emailVerification(
  req: Request<unknown, unknown, { key: string }, unknown>,
  res: Response<VerificationResponse>,
  next: NextFunction,
): void {
  const verificationKey = req.body.key

  getUserByVerToken(verificationKey)
    .then((user) => {
      if (verificationKey === user?.verificationToken) {
        setUserVerified(user)
          .then((affectedRows) => {
            if (Number(affectedRows[1]) === 1) {
              res.status(OK).json({
                message: 'Verified',
                name: user.name,
                email: user.email,
                isVerified: true,
              })
            } else if (Number(affectedRows[1]) === 0) {
              res.status(OK).json({
                message: 'Already verified',
                email: user.email,
              })
            }
          })
          .catch(() => {
            next(new HttpError(INTERNAL_SERVER_ERROR))
          })
      } else {
        res.status(OK).json({
          message: 'Token is expired or invalid',
          email: user?.email,
        })
      }
    })
    .catch((error) => {
      if (error instanceof ParameterError) {
        next(new HttpError(BAD_REQUEST, error.message))
      } else if (error instanceof NotFoundError) {
        next(new HttpError(NOT_FOUND))
      } else {
        next(new HttpError(INTERNAL_SERVER_ERROR))
      }
    })
}
