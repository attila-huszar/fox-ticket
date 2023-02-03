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
import AdminArticle from './AdminArticle';
import 'react-toastify/dist/ReactToastify.css';
import { LoggedInUser, UserContextInterface } from '../interfaces/user';
import {
  CartContextInterface,
  PendingOrdersResponse,
} from '../interfaces/orders';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export const UserContext = createContext<UserContextInterface>();
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export const CartContext = createContext<CartContextInterface>();

export default function App() {
  const [cart, setCart] = useState<PendingOrdersResponse[]>([]);
  const [currentUser, setCurrentUser] = useState<LoggedInUser>({
    name: localStorage.getItem('name') || 'Guest',
    email: localStorage.getItem('email') || 'visitor',
    token: localStorage.getItem('token') || '',
    isAdmin: localStorage.getItem('admin') === 'true' ? true : false,
  });

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <CartContext.Provider value={{ cart, setCart }}>
      <Header />
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
      <Footer />
      </CartContext.Provider>
    </UserContext.Provider>
  )}

