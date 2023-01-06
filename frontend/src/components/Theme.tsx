import { createTheme, NextUIProvider, Switch } from "@nextui-org/react";
import { useDarkMode } from "usehooks-ts";
import { TbSun, TbMoon } from "react-icons/tb";

const lightTheme = createTheme({
  type: "light",
});
const darkTheme = createTheme({
  type: "dark",
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
