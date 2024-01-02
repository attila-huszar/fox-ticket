import { Routes, Route } from 'react-router-dom';
import { createContext, useState } from 'react';

import Home from './Home';
import Header from './Header';
import Shop from './Shop';
import MyTickets from './MyTickets';
import Cart from './Cart';
import Profile from './Profile';
import Footer from './Footer';
import NotImplementedPage from './NotImplementedPage';
import AdminProduct from './AdminProduct';
import 'react-toastify/dist/ReactToastify.css';
import { LoggedInUser, UserContextInterface } from '../interfaces/user';
import {
  CartContextInterface,
  PendingOrdersResponse,
} from '../interfaces/orders';

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

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <CartContext.Provider value={{ cart, setCart }}>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/mytickets" element={<MyTickets />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products" element={<AdminProduct />} />
          <Route path="*" element={<NotImplementedPage />} />
        </Routes>
        <Footer />
      </CartContext.Provider>
    </UserContext.Provider>
  );
}
