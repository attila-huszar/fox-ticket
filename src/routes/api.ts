import { home } from "../controllers/homeController";
import { login } from "../controllers/loginController";
import { logout } from "../controllers/logoutController";
import { refresh } from "../controllers/refreshController";
import { emailVerification } from "../controllers/emailVerificationController";

import { auth } from "../middleware/auth";
import { NOT_FOUND } from "http-status";
import HttpError from "../errors/httpError";
import { NextFunction } from "express";
const express = require("express");

export const apiRouter = express.Router();

apiRouter.use(express.json());

//// GET
apiRouter.get("/", auth, home);
apiRouter.get("/verify", emailVerification);

//// POST
apiRouter.post("/login", login);
apiRouter.post("/refresh", refresh);
apiRouter.post("/logout", auth, logout);

//// 404
apiRouter.use("/*", (req: Request, res: Response, next: NextFunction) => next(new HttpError(NOT_FOUND)));
