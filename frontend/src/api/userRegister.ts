import axios, { AxiosError } from 'axios'
import { UserResponse, RegisterRequest } from '@interfaces/user'

export async function userRegister(
  user: RegisterRequest,
): Promise<UserResponse> {
  try {
    const { data }: { data: UserResponse } = await axios.post('/api/register', {
      name: user.name,
      email: user.email,
      password: user.password,
    })

    return data
  } catch (error) {
    throw new Error(
      error instanceof AxiosError ? error.message : 'Something went wrong',
    )
  }
}
