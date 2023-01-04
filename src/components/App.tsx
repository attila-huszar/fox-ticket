import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Home from "./Home";
import Header from "./Header";
import NotImplementedPage from "./NotImplementedPage";

export default function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Fox Test</title>
        <script src="./noflash.js" type="text/javascript" />
      </Helmet>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<NotImplementedPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
