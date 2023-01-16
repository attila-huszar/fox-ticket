import { User } from "../interfaces/User";

export function parseJwt(token: string): User {
  const base64 = Buffer.from(token.split(".")[1], "base64").toString();

  let decoded: User = {
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
