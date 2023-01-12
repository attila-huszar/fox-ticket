import { JwtPayload } from "jsonwebtoken";

export interface JwtUser extends JwtPayload {
  email: string;
  role: "user" | "admin";
}
