import { JwtPayload } from "jsonwebtoken";

export interface UserJwt extends JwtPayload {
  email: string;
  pass?: string;
  isAdmin?: boolean;
  isVerified?: boolean;
}
