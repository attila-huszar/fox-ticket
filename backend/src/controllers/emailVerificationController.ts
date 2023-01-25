import { Request, Response, NextFunction } from "express";
import {
  BAD_REQUEST,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
} from "http-status";
import { HttpError, NotFoundError, ParameterError } from "../errors";
import { getUserByVerToken, setUserVerified } from "../repositories/userRepo";

export async function emailVerification(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const verificationQuery = req.body.verifyToken;
  const user = await getUserByVerToken(verificationQuery);

  if (verificationQuery && user) {
    try {
      const jwtRegex = /[a-z0-9]+\.[a-z0-9]+\.[a-z0-9]+/i;
      if (!jwtRegex.test(verificationQuery))
        return res
          .status(FORBIDDEN)
          .send({ message: "Malformed verification query" });

      if (verificationQuery === user?.dataValues.verificationToken) {
        const [affectedCount] = await setUserVerified(user);

        if (affectedCount === 1) {
          res.send(OK).json({ name: user.name, email: user.email });
        } else {
          res.send(FORBIDDEN).json({ modified: affectedCount });
        }
      } else {
        res.status(FORBIDDEN).json({
          email: user.email,
          message: "Token is expired or invalid",
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
    res.redirect("/"); //.send({ message: "Verification key missing" });
  }
}
