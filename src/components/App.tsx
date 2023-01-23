import { createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import Shop from "./Shop";
import MyTickets from "./MyTickets";
import Cart from "./Cart";
import Profile from "./Profile";
import Footer from "./Footer";
import NotImplementedPage from "./NotImplementedPage";
import { User } from "../interfaces/user";
import { Flip, ToastContainer } from "react-toastify";

const guestUser: User = {
  name: "Guest",
  email: "guest@foxticket.com",
  isAdmin: true,
};
export const UserContext = createContext<User>(guestUser);

export default function App() {
  return (
    <UserContext.Provider value={guestUser}>
      <ToastContainer style={{ marginTop: "80px" }} transition={Flip} />
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/mytickets" element={<MyTickets />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotImplementedPage />} />
      </Routes>
      <Footer />
    </UserContext.Provider>
  );
}
