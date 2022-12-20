import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Navbar from "./Navbar";
import NotImplementedPage from "./NotImplementedPage";

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
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="*" element={<NotImplementedPage />} />
      </Routes>
    </BrowserRouter>
  );
}
