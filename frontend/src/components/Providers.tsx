import { NextUIProvider } from '@nextui-org/react';
import { useDarkMode } from 'usehooks-ts';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Flip, toast, ToastContainer } from 'react-toastify';
import emailVerify from '../api/emailVerify';
import { RegisterRequest } from '../interfaces/user';

export default function Providers() {
  const { isDarkMode } = useDarkMode();

  const url = window.location.href.split('?');
  const baseUrl = url[0];
  const search = url[1] || '';

  let verifiedUser: RegisterRequest | string;

  const notifyVerified = () =>
    toast.success(
      `${verifiedUser} was successfully verified! You can now log in with your email address and password.`,
    );

  const notifyAlredySent = () =>
    toast.warn(
      `${verifiedUser} is already verified. Please log in with your email address and password.`,
    );

  if (search.includes('verify=')) {
    window.history.pushState('name', '', baseUrl);
    checkVerificationQuery();
  }

  async function checkVerificationQuery() {
    const jwtRegex = /[a-z\d]+\.[a-z\d]+\.[a-z\d]+/i;
    if (jwtRegex.test(search)) {
      try {
        verifiedUser = await emailVerify(search.split('verify=')[1]);

        if (verifiedUser) notifyVerified();
      } catch (error) {
        if (error instanceof Error) {
          verifiedUser = error.toString().split('Error: ')[1];
        }

        if (verifiedUser) notifyAlredySent();
      }
    }
  }

  return (
    <NextUIProvider>
      <ToastContainer
        style={{ marginTop: '80px' }}
        transition={Flip}
        position="top-center"
        autoClose={4000}
        theme={isDarkMode ? 'dark' : 'light'}
      />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NextUIProvider>
  );
}
