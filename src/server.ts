import dotenv from "dotenv";
import express from "express";
import cookieparser from "cookie-parser";
import jwt from "jsonwebtoken";
import pino from "pino-http";
// import bodyParser from "body-parser";

dotenv.config({ path: "../.env.development.local" });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(pino());

const userCredentials = {
  username: "admin",
  password: "admin123",
  role: "admin",
};

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === userCredentials.username && password === userCredentials.password) {
    const accessToken = jwt.sign({ username: userCredentials.username }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "10m" });

    const refreshToken = jwt.sign({ username: userCredentials.username }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "30d" });

    res.cookie("jwt", refreshToken, { httpOnly: true, sameSite: "none", secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
    return res.json({ accessToken });

  } else {
    return res.status(406).json({ message: "Invalid credentials" });
  }
});

app.post("/refresh", (req, res) => {
  if (req.cookies.jwt) {
    const refreshToken = req.cookies.jwt;

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err: any, _decoded: any) => {
      if (err) {
        return res.status(406).json({ message: "Unauthorized: Wrong Token" });
      } else {
        const accessToken = jwt.sign({ username: userCredentials.username }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "10m" });
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
