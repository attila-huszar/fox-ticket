import dotenv from "dotenv";
import express from "express";
import cookieparser from "cookie-parser";
import jwt from "jsonwebtoken";
// import bodyParser from "body-parser";

dotenv.config({ path: "../.env.development.local" }); // configuring dotenv

const app = express();

// Setting up middlewares to parse request body and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());

const userCredentials = {
  username: "admin",
  password: "admin123",
  email: "admin@gmail.com",
};

app.post("/login", (req, res) => {
  // Destructuring username & password from body
  const { username, password } = req.body;

  if (username === userCredentials.username && password === userCredentials.password) {
    // Creating access token
    const accessToken = jwt.sign(
      {
        username: userCredentials.username,
        email: userCredentials.email,
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      {
        expiresIn: "10m",
      }
    );

    // Creating refresh token not that expiry of refresh token is greater than the access token
    const refreshToken = jwt.sign(
      {
        username: userCredentials.username,
      },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: "1d" }
    );

    // Assigning refresh token in http-only cookie
    res.cookie("jwt", refreshToken, { httpOnly: true, sameSite: "none", secure: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.json({ accessToken });
  } else {
    // Return unauthorized error if credentials don't match
    return res.status(406).json({
      message: "Invalid credentials",
    });
  }
});

app.post("/refresh", (req, res) => {
  if (req.headers.cookie) {
    // Destructuring refreshToken from cookie
    const refreshToken = req.headers.cookie;

    // Verifying refresh token
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err: any, decoded: any) => {
      if (err) {
        // Wrong Refresh Token
        return res.status(406).json({ message: "Wrong Refresh Token" });
      } else {
        // Correct token we send a new access token
        const accessToken = jwt.sign(
          {
            username: userCredentials.username,
            email: userCredentials.email,
          },
          process.env.ACCESS_TOKEN_SECRET as string,
          {
            expiresIn: "10m",
          }
        );
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
