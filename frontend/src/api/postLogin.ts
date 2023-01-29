import axios, { AxiosError } from 'axios';
import { LoginRequest } from '../interfaces/user';

export async function postLogin(userData: LoginRequest): Promise<any> {
  try {
    const response = await axios.post('/api/login', {
      email: userData.email,
      password: userData.password,
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
  }
}
