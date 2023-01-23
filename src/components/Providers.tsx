import { Helmet, HelmetProvider } from "react-helmet-async";
import { NextUIProvider } from "@nextui-org/react";
import { lightTheme, darkTheme } from "../styles/theme";
import { useDarkMode } from "usehooks-ts";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { createContext } from "react";
import { User } from "../interfaces/user";

const guestUser: User = {
  name: "Guest",
  email: "guest@foxticket.com",
  isAdmin: true,
};
export const UserContext = createContext<User>(guestUser);

export default function Providers() {
  const { isDarkMode } = useDarkMode();

  return (
    <HelmetProvider>
      <Helmet>
        <title>Fox Ticket</title>
        <script src="./noflash.js" type="text/javascript" />
      </Helmet>
      
      <UserContext.Provider value={guestUser}>
        <NextUIProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </NextUIProvider>
      </UserContext.Provider>
    </HelmetProvider>
  );
}
