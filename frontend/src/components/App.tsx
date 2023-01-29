import { Routes, Route } from 'react-router-dom';
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

export default function App() {
  return (
    <>
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
    </>
  );
}
