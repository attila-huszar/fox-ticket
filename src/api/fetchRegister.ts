import { RegisterRequest } from '../interfaces/user';
import axios, { AxiosError } from 'axios';

export default async function fetchRegister(userData: RegisterRequest) {
  try {
    const result = await axios.post('/api/register', {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });
    return result.data.email;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
  }
}
