import { UserJwt } from "../interfaces/User";

export const mockUsers: UserJwt[] = [
  {
    email: "admin@foxticket.com",
    pass: "admin",
    isAdmin: true,
    isVerified: true,
  },
  {
    email: "user@foxticket.com",
    pass: "user",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "cinkes@gmail.com",
    pass: "cinkes",
    isAdmin: true,
    isVerified: false,
  },
];
