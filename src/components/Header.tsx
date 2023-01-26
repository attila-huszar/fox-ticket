import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "./Providers";
import { Navbar, Text, Input, Switch } from "@nextui-org/react";
import Login from "./Login";
import SignUp from "./SignUp";
import ProfileDropdown from "./ProfileDropdown";
import Cart from "./Cart";
import { User } from "../interfaces/user";
import logo from "../static/logo.png";
import "../styles/Header.css";
import { useDarkMode } from "usehooks-ts";
import { TbMoon, TbSun } from "react-icons/tb";

export default function Header() {
  const user: User = useContext(UserContext);
  const isLoggedIn: boolean = user.isAdmin;

  const { isDarkMode, toggle } = useDarkMode();

  return (
    <Navbar
      isBordered
      variant="floating"
      css={{
        background: "var(--nextui-colors-navbarGradient)",
        "@xsMax": {
          w: "100%",
          jc: "space-between",
        },
      }}>
      <Navbar.Brand css={{ mr: "$4" }} style={{ display: "flex", gap: "15px" }}>
        <img src={logo} alt="logo" style={{ width: "50px", height: "auto" }} />
        <Text
          b
          color="inherit"
          style={{
            margin: "0 10px 0 0",
            fontFamily: "Helvetica, sans-serif",
            fontSize: "34px",
          }}>
          Fox
        </Text>
        <Navbar.Content style={{ fontSize: "1.1rem" }}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "activeLink" : "inactiveLink"
            }>
            News
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive ? "activeLink" : "inactiveLink"
            }>
            Shop
          </NavLink>
          <NavLink
            to="/mytickets"
            className={({ isActive }) =>
              isActive ? "activeLink" : "inactiveLink"
            }>
            My Tickets
          </NavLink>
        </Navbar.Content>
      </Navbar.Brand>

      <Navbar.Content>
        {isLoggedIn ? <Text>Admin</Text> : null}
        {isLoggedIn ? <Navbar.Item>{<Login />}</Navbar.Item> : null}
        {isLoggedIn ? (
          <Navbar.Item>{<SignUp />}</Navbar.Item>
        ) : null}
        <Cart />
        <Navbar.Item>
          <ProfileDropdown />
        </Navbar.Item>
        <Switch
          checked={isDarkMode}
          onChange={toggle}
          iconOn={<TbMoon />}
          iconOff={<TbSun />}
          size="lg"
          color="secondary"
          bordered
          shadow
        />
      </Navbar.Content>
    </Navbar>
  );
}
