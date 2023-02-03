import axios, { AxiosError } from 'axios';

export default async function postLogout(userData: {
  email: string;
  token: string;
}) {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('admin');

    const response = await axios.post(
      '/api/logout',
      {
        email: userData.email,
      },
      { headers: { authorization: userData.token } }
    );

    return response.data.email;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
  }
}
