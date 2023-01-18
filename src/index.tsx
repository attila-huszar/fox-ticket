import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./components/App";
import { NextUIProvider } from "@nextui-org/react";
import { darkTheme, lightTheme } from "./components/ThemeSwitch";
//import reportWebVitals from "./reportWebVitals.ts";
console.log(darkTheme)
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <NextUIProvider /*theme={IsDark() ? darkTheme : lightTheme}*/>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NextUIProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals(console.log);
