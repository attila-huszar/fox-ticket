export type User = {
  email: string;
  pass: string;
  role: "user" | "admin";
};

export const users: User[] = [
  {
    email: "admin@foxticket.com",
    pass: "admin",
    role: "admin",
  },
  {
    email: "user@foxticket.com",
    pass: "user",
    role: "user",
  },
];
