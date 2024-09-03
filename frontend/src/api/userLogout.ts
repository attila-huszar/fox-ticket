import axios, { AxiosError } from 'axios'
import { UserResponse, UserRequest } from '@interfaces/user'

export async function userLogout(user: UserRequest): Promise<UserResponse> {
  try {
    const { data }: { data: UserResponse } = await axios.post(
      '/api/logout',
      {
        email: user.email,
      },
      { headers: { authorization: user.token } },
    )

    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message)
    } else {
      throw new Error('Something went wrong')
    }
  }
}
