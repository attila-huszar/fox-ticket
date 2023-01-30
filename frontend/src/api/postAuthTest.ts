import axios, { AxiosError } from 'axios';

export default async function postAuthTest(userData: {
  email: string;
  token: string;
}): Promise<string | undefined> {
  try {
    const response = await axios.post(
      '/api/authtest',
      {
        email: userData.email,
      },
      { headers: { authorization: userData.token } }
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
  }
}
