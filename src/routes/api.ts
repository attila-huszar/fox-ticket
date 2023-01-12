import express from "express";
import status from "http-status";
import { auth } from "../middleware/auth";
import { login } from "../controllers/loginController";
import { logout } from "../controllers/logoutController";
import { refresh } from "../controllers/refreshController";
import HttpError from "../errors/httpError";
import { AuthorizedRequest } from "../interfaces/AuthorizedRequest";

export const apiRouter = express.Router();

apiRouter.use(express.json());

apiRouter.post("/login", login);

apiRouter.post("/refresh", refresh);

//apiRouter.post("/logout", auth, logout);

apiRouter.use("/*", (req, res, next) => next(new HttpError(status.NOT_FOUND)));
