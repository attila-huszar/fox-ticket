import axios, { AxiosError } from 'axios'

export async function emailVerify(queryString: string): Promise<string> {
  try {
    const response = await axios.post('/api/verify', {
      key: queryString,
    })

    return response.data.email
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.email)
    } else {
      throw new Error('Something went wrong')
    }
  }
}
