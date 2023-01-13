import express from "express";
import compressionMiddleware from "compression";
import helmetMiddleware from "helmet";
import { apiLimiter } from "./middleware/rateLimiter";
import { apiRouter } from "./routes/api";
import { staticRouter } from "./routes/static";
import pinoHttp from "pino-http";

export const app = express();

app.use(compressionMiddleware());
app.use(helmetMiddleware());
app.use(pinoHttp());

app.use("/", apiLimiter, apiRouter);
app.use(staticRouter);
