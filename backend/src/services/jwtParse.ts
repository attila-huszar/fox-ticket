import { RegisterResponse } from "../interfaces/user";

export function jwtParse(token: string): RegisterResponse {
  const base64 = Buffer.from(token.split(".")[1], "base64").toString();

  let decoded: RegisterResponse = {
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
