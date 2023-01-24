import { Request, Response, NextFunction } from "express";
import {
  BAD_REQUEST,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
} from "http-status";
import { HttpError, NotFoundError, ParameterError } from "../errors";
import { jwtParse } from "../services/jwtParse";
import { testKey } from "../services/sendTestEmail";

export async function emailVerification(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const verificationQuery = req.query.key as string;

  if (verificationQuery) {
    try {
      const jwtRegex = /[a-z0-9]+\.[a-z0-9]+\.[a-z0-9]+/i;
      if (!jwtRegex.test(verificationQuery))
        return res
          .status(FORBIDDEN)
          .send({ message: "Malformed verification query" });

      const jwtPayload = jwtParse(verificationQuery);
      if (jwtPayload.email === "")
        return res
          .status(FORBIDDEN)
          .json({ message: "Invalid verification token" });

      if (verificationQuery === (await testKey)) {
        res.status(OK).send({ email: jwtPayload.email, message: "Verified" });
      } else {
        res.status(FORBIDDEN).send({
          email: jwtPayload.email,
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
