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
  isVerified?: boolean;
}

export interface UserContextInterface {
  user: LoggedInUser;
  setUser?: (user: LoggedInUser) => void;
}

export interface InputField {
  text: string;
  color:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | undefined;
}
