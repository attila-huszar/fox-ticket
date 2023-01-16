import status from "http-status";
import { auth } from "../middleware/auth";
import { login } from "../controllers/loginController";
import { logout } from "../controllers/logoutController";
import { refresh } from "../controllers/refreshController";
import { emailVerification } from "../controllers/emailVerificationController";
import HttpError from "../errors/httpError";
import { NextFunction } from "express";
const express = require("express");

export const apiRouter = express.Router();

apiRouter.use(express.json());

apiRouter.post("/login", login);

apiRouter.post("/refresh", refresh);

apiRouter.get("/verify", emailVerification);

apiRouter.post("/logout", auth, logout);

apiRouter.use("/*", (req: Request, res: Response, next: NextFunction) => next(new HttpError(status.NOT_FOUND)));
