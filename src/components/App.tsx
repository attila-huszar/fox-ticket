import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import "./App.css";
// import Landing from "./Landing/..."
// import Login from "./Login/..."
// import Register from "./Register/..."
import NotImplementedPage from "./NotImplentedPage/NotImplementedPage";

function App() {
  return (
    <NextUIProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> */}
          <Route path="/*" element={<NotImplementedPage />} />
        </Routes>
      </BrowserRouter>

      {/* <Components /> */}
    </NextUIProvider>
  );
}

export default App;
