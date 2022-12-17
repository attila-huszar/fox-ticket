import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// import Landing from "./Landing/..."
// import Login from "./Login/..."
// import Register from "./Register/..."
import NotImplementedPage from "./NotImplentedPage/NotImplementedPage";
import DarkMode from "./DarkMode";

export default function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "./noflash.js";
    script.async = true;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <BrowserRouter>
      <DarkMode />
      <Routes>
        {/* <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> */}
        <Route path="/*" element={<NotImplementedPage />} />
      </Routes>
    </BrowserRouter>
  );
}
