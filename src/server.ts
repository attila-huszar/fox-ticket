import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import { auth, userAuth } from "./middleware/auth";
import { refreshTokenVerify } from "./services/refreshTokenVerify";
import { generateAccessToken, generateRefreshToken } from "./services/tokenSign";
import { users } from "./services/mockUsers";
import { pinoHttp } from "pino-http";
import { apiLimiter, regLimiter } from "./middleware/rate-limiter";

dotenv.config({ path: "../.env" });
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(pinoHttp());
app.use("/api", apiLimiter);

//// Endpoints

app.post("/login", (req: Request, res: Response) => {
  const { email, pass } = req.body;
  const user = users.find(u => {
    return u.email === email && u.pass === pass;
  });

  if (user) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("jwt", refreshToken, { path: "/refresh", httpOnly: true, sameSite: "none", secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 });

    res.json({ user: user.email, role: user.role, accessToken });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.post("/refresh", regLimiter, (req: Request, res: Response) => refreshTokenVerify(req, res));

app.post("/logout", auth, (req: userAuth, res: Response) => {
  const user = req.user;
  res.clearCookie("jwt", { path: "/refresh", httpOnly: true, sameSite: "none", secure: true });
  res.status(200).json({ message: `${user} logged out successfully` });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server active on http://localhost:${process.env.PORT || 5000}`);
});
