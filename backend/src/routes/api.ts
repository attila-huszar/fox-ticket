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

const router = express.Router();

router.use(express.json());

//// GET
router.get("/", auth, home);
router.get("/verify", emailVerification);

//// POST
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", auth, logout);

//// 404
router.use("/*", (req: Request, res: Response, next: NextFunction) => next(new HttpError(NOT_FOUND)));

export default router;
