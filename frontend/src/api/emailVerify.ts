import axios, { AxiosError, AxiosResponse } from 'axios';

export default async function emailVerify(queryString: string) {
  try {
    const res: AxiosResponse<any, any> = await axios.post('/api/verify', {
      key: queryString,
    });

    return res.data.email;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.email);
    }
  }
}
