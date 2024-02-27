import axios, { AxiosError } from 'axios'
import { UserRequest, UserResponse } from '@interfaces/user'

export async function postAuthTest(user: UserRequest): Promise<UserResponse> {
  try {
    const response = await axios.post(
      '/api/authtest',
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
