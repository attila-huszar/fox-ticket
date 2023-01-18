import express from "express";
import path from "path";

export const staticRouter = express.Router();

const publicDir = path.resolve(path.join(__dirname, "..", "..", "..", "..", "build"));

staticRouter.get("/*", (req, res) => res.sendFile(path.join(publicDir, "index.html")));
