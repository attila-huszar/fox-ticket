import { createTheme } from "@nextui-org/react";

export const lightTheme = createTheme({
  type: "light",
  theme: {
    colors: {
      background: "#f8fafb",
      navbarActive: "#cee4fe",
      navbarLink: "#000",
      navbarGradient:
        "linear-gradient(180deg, rgba(248,250,251,1) 0%, rgba(248,250,251,0.8) 30%, rgba(248,250,251,0) 80%)",
      hoverShadow: "#7450dd",
    },
  },
});

export const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {
      background: "#131a28",
      navbarActive: "#10253e",
      navbarLink: "#fff",
      navbarGradient:
        "linear-gradient(180deg, rgba(19,26,40,1) 0%, rgba(19,26,40,0.95) 30%, rgba(248,250,251,0) 100%)",
      hoverShadow: "#7450dd",
    },
  },
});
