import { JwtPayload } from "jsonwebtoken";

export interface User extends JwtPayload {
  email: string;
  pass?: string;
  isAdmin?: boolean;
  isVerified?: boolean;
}
