import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./landing/Landing";
import Cart from "./cart/Cart";
import Shop from "./shop/Shop";
import NotImplementedPage from './notimplentedpage/NotImplementedPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/shop" element={<Shop/>} />
        <Route path="*" element={<NotImplementedPage />} />
      </Routes>
    </BrowserRouter>
  );
}