import { User } from "../interfaces/user";

export const mockUsers: User[] = [
  {
    email: "admin@foxticket.com",
    password: "admin",
    isAdmin: true,
    isVerified: true,
  },
  {
    email: "user@foxticket.com",
    password: "user",
    isAdmin: false,
    isVerified: true,
  },
  {
    email: "cinkes@gmail.com",
    password: "cinkes",
    isAdmin: true,
    isVerified: false,
  },
];
