import { LoginRequest, RegisterRequest } from '../interfaces/user';
import axios, { AxiosError } from 'axios';

export default async function fetchRegister(userData: RegisterRequest) {
  let result;
  try {
    result = await axios.post('/api/register', {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
  }
  return result?.data.email;
}

export async function fetchLogin(userData: LoginRequest) {
  try {
    await axios.post('/api/login', {
      email: userData.email,
      password: userData.password,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
  }
}
