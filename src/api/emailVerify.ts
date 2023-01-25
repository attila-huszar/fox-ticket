import axios, { AxiosError } from 'axios';

export default async function emailVerify(userData: { email: string; verifyToken: string; }) {
  try {
    await axios.post('/api/verify', {
      email: userData.email,
      verifyToken: userData.verifyToken,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
  }
}

export async function fetchLogin(userData: { email: string; password: string; }) {
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
