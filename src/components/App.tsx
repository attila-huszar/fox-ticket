import { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Home from "./Home";
import Header from "./Header";
import Shop from "./Shop";
import MyTickets from "./MyTickets";
import Cart from "./Cart";
import Profile from "./Profile";
import Footer from "./Footer";
import NotImplementedPage from "./NotImplementedPage";
import { User } from "../interfaces/user";

const guestUser: User = {
  name: "Guest",
  email: "guest@foxticket.com",
  isAdmin: false,
};
export const UserContext = createContext<User>(guestUser);

export default function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Fox Ticket</title>
        <script src="./noflash.js" type="text/javascript" />
      </Helmet>
      <UserContext.Provider value={guestUser}>
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
    </HelmetProvider>
  );
}
