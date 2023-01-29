import { Helmet, HelmetProvider } from "react-helmet-async";
import { NextUIProvider } from "@nextui-org/react";
import { lightTheme, darkTheme } from "../styles/theme";
import { useDarkMode } from "usehooks-ts";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

export default function Providers() {
  const { isDarkMode } = useDarkMode();

  return (
    <HelmetProvider>
      <Helmet>
        <title>Fox Ticket</title>
        <script src="./noflash.js" type="text/javascript" />
      </Helmet>

      <NextUIProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NextUIProvider>
    </HelmetProvider>
  );
}
