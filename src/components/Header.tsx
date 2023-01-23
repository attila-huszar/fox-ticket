import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "./Providers";
import { Navbar, Text, Input } from "@nextui-org/react";
import Login from "./Login";
import SignUp from "./SignUp";
import ProfileDropdown from "./ProfileDropdown";
import Cart from "./Cart";
import ThemeSwitch from "./ThemeSwitch";
import { User } from "../interfaces/user";
import logo from "../static/logo.png";
import "../styles/Header.css";

export default function Header() {
  const user: User = useContext(UserContext);
  const isLoggedIn: boolean = user.isAdmin;

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
        {isLoggedIn ? <Navbar.Item hideIn="sm">{<Login />}</Navbar.Item> : null}
        {isLoggedIn ? (
          <Navbar.Item hideIn="sm">{<SignUp />}</Navbar.Item>
        ) : null}
        <Navbar.Item
          hideIn="sm"
          css={{
            "@xsMax": {
              w: "100%",
              jc: "center",
            },
          }}>
          <Input
            css={{
              w: "100%",
              "@xsMax": {
                mw: "300px",
              },
              "& .nextui-input-content--left": {
                h: "100%",
                ml: "$4",
                dflex: "center",
              },
            }}
            placeholder="Search..."
          />
        </Navbar.Item>

        <Cart />
        <Navbar.Item>
          <ProfileDropdown />
        </Navbar.Item>
        <ThemeSwitch />
      </Navbar.Content>
    </Navbar>
  );
}
