import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './landing/Landing';
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./App.css";
import Cart from "./cart/Cart";
import Shop from "./shop/Shop";
import Navbar from "./Navbar";
import NotImplementedPage from "./NotImplementedPage";
import Login from "./Login";
import Logout from "./logout";
import Profile from "./profile";
import Purchases from "./purchases";
import Register from "./register";

export default function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Fox ticket</title>
        <script src="./noflash.js" type="text/javascript" />
      </Helmet>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/shop" element={<Shop/>} />
          <Route path="*" element={<NotImplementedPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}