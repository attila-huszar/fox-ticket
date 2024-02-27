import axios, { AxiosError } from 'axios'
import { UserResponse, RegisterRequest } from '@interfaces/user'

export async function postRegister(
  user: RegisterRequest,
): Promise<UserResponse> {
  try {
    const response = await axios.post('/api/register', {
      name: user.name,
      email: user.email,
      password: user.password,
    })

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message)
    } else {
      throw new Error('Something went wrong')
    }
  }
}
