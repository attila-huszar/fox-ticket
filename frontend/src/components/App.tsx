import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./landing/Landing";
import Shop from "./shop/Shop";
import Cart from "./cart/Cart";
import Registration from "./registration/Registration";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}
