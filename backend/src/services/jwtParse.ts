import { UserJwt } from "../interfaces/User";

export function jwtParse(token: string): UserJwt {
  const base64 = Buffer.from(token.split(".")[1], "base64").toString();

  let decoded: UserJwt = {
    email: "",
    isAdmin: false,
  };

  try {
    decoded = JSON.parse(base64);
  } catch (error) {
    console.log("Invalid token payload");
  }
  return decoded;
}
