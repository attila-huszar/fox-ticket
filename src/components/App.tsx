import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./Landing";
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
        <Route path="/" element={<Landing />} />
        <Route path="/*" element={<NotImplementedPage />} />
      </Routes>
    </BrowserRouter>
  );
}
