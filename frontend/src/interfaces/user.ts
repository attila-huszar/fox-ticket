export interface IUserContext {
  user: UserResponse
  setUser: (user: UserResponse) => void
}

export interface UserResponse {
  name: string
  email: string
  token: string
  isAdmin?: boolean
  isVerified?: boolean
}

export interface UserRequest {
  email: string
  token: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}
