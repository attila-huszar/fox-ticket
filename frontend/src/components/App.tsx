import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Home from './Home';
import Header from './Header';
import Shop from './Shop';
import MyTickets from './MyTickets';
import Cart from './Cart';
import Profile from './Profile';
import Footer from './Footer';
import NotImplementedPage from './NotImplementedPage';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Flip, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailVerify from '../api/emailVerify';
import { RegisterRequest } from '../interfaces/user';
import { createContext, useState } from 'react';

export const UserContext = createContext({});
import AdminProduct from './AdminProduct';
import AdminArticle from './AdminArticle';

export default function App() {
  const { pathname, search } = useLocation();

  let verifiedUser: RegisterRequest;

  const notifyVerified = () =>
    toast.success(
      `Welcome ${verifiedUser}! You can now log in with your email address and password.`,
      {
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      }
    );
  const notifyAlredySent = () =>
    toast.warn(
      `${verifiedUser} is already verified. Please log in with your email address and password.`,
      {
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      }
    );

  async function checkVerificationQuery() {
    const jwtRegex = /[a-z0-9]+\.[a-z0-9]+\.[a-z0-9]+/i;
    if (search.includes('?verify=') && jwtRegex.test(search)) {
      try {
        verifiedUser = await emailVerify(search.split('?verify=')[1]);

        if (verifiedUser) notifyVerified();
      } catch (error: any) {
        error = error.toString().split('Error: ')[1];
        verifiedUser = error;

        if (verifiedUser) notifyAlredySent();
      }
    }
  }

  if (search.includes('?verify=')) {
    checkVerificationQuery();
    const baseUrl = window.location.href.split('?')[0];
    window.history.pushState('name', '', baseUrl);
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>Fox Ticket</title>
        <script src="./noflash.js" type="text/javascript" />
      </Helmet>
      <Header />
      <ToastContainer style={{ marginTop: '80px' }} />
      <TransitionGroup>
        <CSSTransition
          key={pathname}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <Routes>
            <Route index element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/mytickets" element={<MyTickets />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/products" element={<AdminProduct />} />
            <Route path="/articles" element={<AdminArticle />} />
            <Route path="*" element={<NotImplementedPage />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </HelmetProvider>
  );
}
