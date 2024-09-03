import axios, { AxiosError } from 'axios'
import { UserResponse, LoginRequest } from '@interfaces/user'

export async function userLogin(user: LoginRequest): Promise<UserResponse> {
  try {
    const { data }: { data: UserResponse } = await axios.post('/api/login', {
      email: user.email,
      password: user.password,
    })

    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message)
    } else {
      throw new Error('Something went wrong')
    }
  }
}
