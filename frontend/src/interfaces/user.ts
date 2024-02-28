export interface IUserContext {
  user: UserResponse
  setUser: (user: UserResponse) => void
}

export interface UserRequest {
  email: string
  token: string
}

export interface UserResponse {
  name: string
  email: string
  token: string
  isAdmin?: boolean
  isVerified?: boolean
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  isVerified?: boolean
}

export interface RegisterResponse {
  message: string
  email: string
  name?: string
  isVerified?: boolean
}

export interface InputHelper {
  text: string
  color:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | undefined
  shake: boolean
}
