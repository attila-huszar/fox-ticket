import axios, { AxiosError } from 'axios'
import { RegisterResponse } from '@interfaces/user'

export async function userVerify(
  queryString: string,
): Promise<RegisterResponse> {
  try {
    const response: { data: RegisterResponse } = await axios.post(
      '/api/verify',
      {
        key: queryString,
      },
    )

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message)
    } else {
      throw new Error('Something went wrong')
    }
  }
}
