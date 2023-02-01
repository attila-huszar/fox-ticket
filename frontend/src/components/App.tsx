import { useState } from 'react';
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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminProduct from './AdminProduct';
import AdminArticle from './AdminArticle';
import { createContext } from 'react';
import {
  CartContextInterface,
  PendingOrdersResponse,
} from '../interfaces/orders';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export const CartContext = createContext<CartContextInterface>();

export default function App() {
  const { pathname } = useLocation();
  const [cart, setCart] = useState<PendingOrdersResponse[]>([]);

  return (
    <HelmetProvider>
      <CartContext.Provider value={{ cart, setCart }}>
        <Helmet>
          <title>Fox Ticket</title>
          <script src="./noflash.js" type="text/javascript" />
        </Helmet>
        <Header />
        <ToastContainer style={{ marginTop: '80px' }} />
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
    </HelmetProvider>
  );
}
