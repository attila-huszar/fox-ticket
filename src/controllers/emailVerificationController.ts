import { Request, Response, NextFunction } from "express";
import status, { FORBIDDEN, OK } from "http-status";
import { HttpError, NotFoundError, ParameterError } from "../errors";
import { User } from "../interfaces/User";
import { parseJwt } from "../services/parseJwt";
import { verificationKey } from "../services/sendTestEmail";

export async function emailVerification(req: Request, res: Response, next: NextFunction) {
  const verificationQuery = req.query.key as string;

  if (verificationQuery) {
    try {
      const jwtRegex = /[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.[a-zA-Z0-9]+/;
      if (!jwtRegex.test(verificationQuery)) return res.status(status.FORBIDDEN).send({ message: "Malformed verification query" });

      const jwtPayload: User = parseJwt(verificationQuery);

      if (jwtPayload.email === "") return res.status(status.FORBIDDEN).json({ message: "Invalid Token" });

      const user = jwtPayload.email;

      if (verificationQuery === (await verificationKey)) {
        res.status(OK).send({ message: `${user} verified` });
      } else {
        res.status(FORBIDDEN).send({ error: true, message: `${user} not verified, expired or invalid token` });
      }
    } catch (error: any) {
      if (error instanceof ParameterError) {
        next(new HttpError(status.BAD_REQUEST, error.message));
      } else if (error instanceof NotFoundError) {
        next(new HttpError(status.NOT_FOUND));
      } else {
        next(new HttpError(status.INTERNAL_SERVER_ERROR));
      }
    }
  } else {
    res.status(status.NOT_FOUND).send({ error: true, message: "Verification key missing" });
  }
}
