export type User = {
  email: string;
  pass?: string;
  role: "user" | "admin";
};
