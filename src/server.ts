import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { pinoHttp } from "pino-http";
import { apiLimiter, regLimiter } from "./middleware/rate-limiter";

dotenv.config({ path: "../.env" });
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(pinoHttp());
app.use("/api", apiLimiter);

type User = {
  name: string;
  pass: string;
  role: "user" | "admin";
};

interface userAuth extends Request {
  user?: string;
}

const users: User[] = [
  {
    name: "john",
    pass: "admin",
    role: "admin",
  },
  {
    name: "jane",
    pass: "user",
    role: "user",
  },
];

const generateAccessToken = (user: User) => {
  return jwt.sign({ name: user.name, role: user.role }, process.env.ACCESS_TOKEN_SECRET as Secret, { expiresIn: "10m" });
};

const generateRefreshToken = (user: User) => {
  return jwt.sign({ name: user.name, role: user.role }, process.env.REFRESH_TOKEN_SECRET as Secret, { expiresIn: "30d" });
};

const auth = (req: userAuth, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as Secret, (err, user: any) => {
      if (err) {
        return res.status(403).json({ message: "Invalid Token" });
      }

      req.user = user.name;
      next();
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

//// Endpoints

// app.get("/", (_req: Request, res: Response) => {
//   res.redirect(303, "/refresh");
// });

app.post("/login", (req: Request, res: Response) => {
  const { name, pass } = req.body;
  const user = users.find(u => {
    return u.name === name && u.pass === pass;
  });

  if (user) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("foxticket", refreshToken, { domain: "localhost", path: "/refresh", httpOnly: true, sameSite: "none", secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 });

    res.json({ user: user.name, role: user.role, accessToken });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.post("/refresh", regLimiter, (req: Request, res: Response) => {
  const refreshToken = req.headers.cookie?.split("=")[1];

  if (refreshToken) {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as Secret, (err, user: any) => {
      if (err) {
        return res.status(403).json({ message: "Invalid Token" });
      } else {
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.json({ accessToken });
        res.cookie("foxticket", refreshToken, { domain: "localhost", path: "/refresh", httpOnly: true, sameSite: "none", secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
      }
    });
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
});

app.post("/logout", auth, (req: userAuth, res: Response) => {
  const user = req.user;
  res.clearCookie("foxticket", { path: "/refresh", httpOnly: true, sameSite: "none", secure: true, domain: "localhost" });
  res.status(200).json({ message: `${user} logged out successfully` });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server active on http://localhost:${process.env.PORT || 5000}`);
});
