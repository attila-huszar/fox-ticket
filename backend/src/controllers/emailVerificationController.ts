import { Request, Response, NextFunction } from 'express';
import {
  BAD_REQUEST,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
} from 'http-status';
import { HttpError, NotFoundError, ParameterError } from '../errors';
import { VerificationResponse } from '../interfaces/user';
import { getUserByVerToken, setUserVerified } from '../repositories/userRepo';

export async function emailVerification(
  req: Request<unknown, unknown, { key: string }, unknown>,
  res: Response<VerificationResponse>,
  next: NextFunction
) {
  const verificationKey = req.body.key;
  const user = await getUserByVerToken(verificationKey);
  
  if (verificationKey && user) {
    try {
      if (verificationKey === user?.dataValues.verificationToken) {
        const affectedRows = await setUserVerified(user);
        const count = affectedRows[1];

        if (Number(count) === 1) {
          res.status(OK).json({
            message: 'Verified',
            name: user.name,
            email: user.email,
            isVerified: true,
          });
        } else {
          res
            .status(FORBIDDEN)
            .json({ message: `Modified: ${affectedRows}`, email: user.email });
        }
      } else {
        res.status(FORBIDDEN).json({
          message: 'Token is expired or invalid',
          email: user.email,
        });
      }
    } catch (error: any) {
      if (error instanceof ParameterError) {
        next(new HttpError(BAD_REQUEST, error.message));
      } else if (error instanceof NotFoundError) {
        next(new HttpError(NOT_FOUND));
      } else {
        next(new HttpError(INTERNAL_SERVER_ERROR));
      }
    }
  } else {
    res.redirect('/');
  }
}
