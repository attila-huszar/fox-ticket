import axios, { AxiosError } from 'axios'
import { UserResponse, UserRequest } from '@interfaces/user'

export async function postLogout(user: UserRequest): Promise<UserResponse> {
  try {
    const response = await axios.post(
      '/api/logout',
      {
        email: user.email,
      },
      { headers: { authorization: user.token } },
    )

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message)
    } else {
      throw new Error('Something went wrong')
    }
  }
}
