import { changeTheme, Switch, useTheme } from "@nextui-org/react";
import { TbSun, TbMoon } from "react-icons/tb";

export default function ThemeSwitch() {
  const { isDark } = useTheme();

  const handleChange = () => {
    const nextTheme = isDark ? "light" : "dark";
    window.localStorage.setItem("data-theme", nextTheme);
    changeTheme(nextTheme);
  };

  return (
    <Switch
      css={{
        "&:hover, &:focus": {
          boxShadow: "0 4px 14px 0 var(--nextui-colors-hoverShadow)",
        },
      }}
      checked={isDark}
      onChange={handleChange}
      iconOn={<TbMoon />}
      iconOff={<TbSun />}
      size="lg"
      color="secondary"
      shadow
    />
  );
}
