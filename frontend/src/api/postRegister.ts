import axios, { AxiosError } from 'axios';
import { RegisterRequest } from '../interfaces/user';

export async function postRegister(userData: RegisterRequest): Promise<any> {
  try {
    const response = await axios.post('/api/register', {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });

    return response.data.email;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
  }
}
