export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface User {
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface InputField {
  text: string;
  color:
    | "success"
    | "warning"
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | undefined;
}
