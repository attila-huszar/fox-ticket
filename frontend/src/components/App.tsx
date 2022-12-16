import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./landing/Landing";
import Login from "./login/login";
import Logout from "./logout/logout";
import Profile from "./profile/profile";
import Purchases from "./purchases/purchases";
import Register from "./register/register";

export function handleClick(e: any) {
  e.preventDefault();
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
