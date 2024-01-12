import { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { useDarkMode } from 'usehooks-ts';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@utils/emailVerifyToast';

import { UserContextInterface, LoggedInUser } from '@interfaces/user';
import {
  CartContextInterface,
  PendingOrdersResponse,
} from '@interfaces/orders';

import Home from './Home';
import Navbar from './Navbar';
import Shop from './Shop';
import MyTickets from './MyTickets';
import Cart from './Cart';
import Profile from './Profile';
import Footer from './Footer';
import AdminProduct from './AdminProduct';
import NotFound from './NotFound';

const defaultUser: LoggedInUser = {
  name: 'Guest',
  email: '',
  token: '',
  isAdmin: false,
};

export const UserContext = createContext<UserContextInterface>({
  user: defaultUser,
});
export const CartContext = createContext<CartContextInterface>({ cart: [] });

export default function App() {
  const [user, setUser] = useState<LoggedInUser>({
    name: localStorage.getItem('name') || 'Guest',
    email: localStorage.getItem('email') || '',
    token: localStorage.getItem('token') || '',
    isAdmin: localStorage.getItem('admin') === 'true' ? true : false,
  });
  const [cart, setCart] = useState<PendingOrdersResponse[]>([]);
  const { isDarkMode } = useDarkMode();

  return (
    <NextUIProvider>
      <ToastContainer
        className="mt-20"
        transition={Flip}
        position="top-center"
        autoClose={4000}
        theme={isDarkMode ? 'dark' : 'light'}
      />
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser }}>
          <CartContext.Provider value={{ cart, setCart }}>
            <Navbar />
            <Routes>
              <Route index element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/mytickets" element={<MyTickets />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/products" element={<AdminProduct />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </CartContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    </NextUIProvider>
  );
}
