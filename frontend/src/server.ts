import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import { pinoHttp } from "pino-http";
import { apiLimiter, regLimiter } from "./rate-limiter";

dotenv.config({ path: "../.env.development.local" });
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(pinoHttp());
app.use("/api", apiLimiter);

const userCredentials = {
  user: "admin",
  pass: "admin123",
  role: "admin",
};

app.post("/login", (req, res) => {
  const { user, pass } = req.body;
  if (user === userCredentials.user && pass === userCredentials.pass) {
    const accessToken = jwt.sign({ user: userCredentials.user }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "10m" });

    const refreshToken = jwt.sign({ user: userCredentials.user }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "30d" });

    res.cookie("foxticket", refreshToken, { httpOnly: true, sameSite: "strict", secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
    return res.json({ accessToken });
  } else {
    return res.status(406).json({ message: "Invalid credentials" });
  }
});

app.post("/refresh", regLimiter, (req, res) => {
  if (req.headers.cookie) {
    const refreshToken = req.headers.cookie.split("=")[1];

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err: any, _decoded: any) => {
      if (err) {
        return res.status(406).json({ message: "Unauthorized: Wrong Token" });
      } else {
        const accessToken = jwt.sign({ user: userCredentials.user }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "10m" });
        return res.json({ accessToken });
      }
    });
  } else {
    return res.status(406).json({ message: "Unauthorized" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server active on http://localhost:${process.env.PORT}`);
});
