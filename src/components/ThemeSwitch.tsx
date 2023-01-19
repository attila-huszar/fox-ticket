import { Switch } from "@nextui-org/react";
import { TbSun, TbMoon } from "react-icons/tb";
import { useDarkMode } from "usehooks-ts";

export default function ThemeSwitch() {
  const { isDarkMode, toggle } = useDarkMode();

  return <Switch checked={isDarkMode} onChange={toggle} iconOn={<TbMoon />} iconOff={<TbSun />} size="lg" color="secondary" bordered shadow />;
}
