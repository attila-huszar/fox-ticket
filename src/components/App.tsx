import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./App.css";
import Home from "./Home";
import Navbar from "./Navbar";
import NotImplementedPage from "./NotImplementedPage";

export default function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Fox Test</title>
        <script src="./noflash.js" type="text/javascript" />
      </Helmet>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<NotImplementedPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
