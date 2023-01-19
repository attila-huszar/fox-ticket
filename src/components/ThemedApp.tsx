import { useDarkMode } from "usehooks-ts";
import { NextUIProvider } from "@nextui-org/react";
import { createTheme } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const lightTheme = createTheme({
  type: "light",
  theme: {
    colors: {
      background: "#f8fafb",
      navbarActive: "#cee4fe",
      navbarLink: "#000",
      navbarGradient: "linear-gradient(180deg, rgba(248,250,251,1) 0%, rgba(248,250,251,0.8) 30%, rgba(248,250,251,0) 80%)",
      hoverShadow: "#7450dd",
    },
  },
});

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {
      background: "#131a28",
      navbarActive: "#10253e",
      navbarLink: "#fff",
      navbarGradient: "linear-gradient(180deg, rgba(19,26,40,1) 0%, rgba(19,26,40,0.95) 30%, rgba(248,250,251,0) 100%)",
      hoverShadow: "#7450dd",
    },
  },
});

export default function ThemedApp() {
  const { isDarkMode } = useDarkMode();

  return (
    <NextUIProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NextUIProvider>
  );
}
