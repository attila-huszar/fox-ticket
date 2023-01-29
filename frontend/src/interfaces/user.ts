export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoggedInUser {
  name: string;
  email: string;
  token: string;
  isAdmin: boolean;
}

export interface InputField {
  text: string;
  color:
    | 'success'
    | 'warning'
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | undefined;
}
