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
