import { Request, Response, NextFunction } from "express";
import { BAD_REQUEST, FORBIDDEN, INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from "http-status";
import { HttpError, NotFoundError, ParameterError } from "../errors";
import { User } from "../interfaces/User";
import { parseJwt } from "../services/parseJwt";
import { verificationKey } from "../services/sendTestEmail";

export async function emailVerification(req: Request, res: Response, next: NextFunction) {
  const verificationQuery = req.query.key as string;

  if (verificationQuery) {
    try {
      const jwtRegex = /[a-z0-9]+\.[a-z0-9]+\.[a-z0-9]+/i;
      if (!jwtRegex.test(verificationQuery)) return res.status(FORBIDDEN).send({ success: false, message: "Malformed verification query" });

      const jwtPayload: User = parseJwt(verificationQuery);
      if (!jwtPayload) return res.status(FORBIDDEN).json({ success: false, message: "Invalid verification token" });
      if (jwtPayload.email === "") return res.status(FORBIDDEN).json({ success: false, message: "Invalid verification token" });

      if (verificationQuery === (await verificationKey)) {
        res.status(OK).send({ success: true, email: jwtPayload.email, message: "Verified" });
      } else {
        res.status(FORBIDDEN).send({ success: false, email: jwtPayload.email, message: "Token is expired or invalid" });
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
    res.redirect("/"); //.send({ success: false, message: "Verification key missing" });
  }
}
