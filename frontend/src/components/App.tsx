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
import { useEffect } from 'react';
import emailVerify from '../api/emailVerify';
import { jwtParse } from '../helpers/jwtParse';

export default function App() {
  const { pathname, search } = useLocation();

  let verifiedEmail: string | Error;

  const notifyVerified = () =>
    toast.success(
      `${verifiedEmail} successfully verified! Please log in with your email address.`,
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
      `Verification email already sent to ${verifiedEmail}. Please check your inbox.`,
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

  async function notifyIfVerified() {
    const jwtRegex = /[a-z0-9]+\.[a-z0-9]+\.[a-z0-9]+/i;
    if (search.includes('?verify=') && jwtRegex.test(search)) {
      if (jwtParse(search)) {
        try {
          verifiedEmail = await emailVerify(search.split('?verify=')[1]);
          if (verifiedEmail === undefined) return;
          notifyVerified();
        } catch (error: any | undefined) {
          console.log(error);
          error = error.toString().split('Error: ')[1];
          verifiedEmail = error;
          notifyAlredySent();
        }
      }
    }
  }

  useEffect(() => {
    notifyIfVerified();
  }, [search]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Fox Ticket</title>
        <script src="./noflash.js" type="text/javascript" />
      </Helmet>
      <Header />
      <ToastContainer transition={Flip} style={{ marginTop: '80px' }} />
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
            <Route path="*" element={<NotImplementedPage />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </HelmetProvider>
  );
}
