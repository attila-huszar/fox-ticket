import { createTheme, NextUIProvider, Switch } from "@nextui-org/react";
import { useDarkMode } from "usehooks-ts";
import { TbSun, TbMoon } from "react-icons/tb";

const lightTheme = createTheme({
  type: "light",
  theme: {
    colors: {
      background: "#f8fafb",
      navbarActive: "#cee4fe",
      navbarLink: "#000",
      navbarGradient: "linear-gradient(180deg, rgba(248,250,251,1) 0%, rgba(248,250,251,0.8) 30%, rgba(248,250,251,0) 80%)",
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
    },
  },
});

export default function Theme() {
  const { isDarkMode, toggle } = useDarkMode();

  return (
    <NextUIProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <div>
        <Switch checked={isDarkMode} onChange={toggle} id="darkModeToggle" iconOn={<TbMoon />} iconOff={<TbSun />} size="lg" color="secondary" shadow />
      </div>
    </NextUIProvider>
  );
}
