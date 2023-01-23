import { useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Navbar, Text, Avatar, Dropdown, Input } from "@nextui-org/react";
import { TbHelp, TbLogout, TbSearch, TbUser } from "react-icons/tb";
import Login from "./Login";
import SignUp from "./SignUp";
import ThemeSwitch from "./ThemeSwitch";
import logo from "../static/logo.png";
import profile_defpic from "../static/profile_def.png";
import "../styles/Header.css";
import Cart from "./Cart";
import { UserContext } from "./App";
import { User } from "../interfaces/user";

export default function Header() {
  const user: User = useContext(UserContext);

  const isLoggedIn: boolean = user.isAdmin;

  const navigate = useNavigate();
  const navigateDropdown = (key: React.Key) => {
    if (key === "LOGOUT") {
      //logout();
    } else {
      const path = String(key);
      navigate(path);
    }
  };

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
            contentRight={<TbSearch />}
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
          <Dropdown placement="bottom-right">
            <Dropdown.Trigger
              css={{
                "&:hover, &:focus": {
                  boxShadow: "0 4px 14px 0 var(--nextui-colors-hoverShadow)",
                },
              }}>
              <Avatar
                bordered
                as="button"
                color="gradient"
                size="md"
                src={profile_defpic}
              />
            </Dropdown.Trigger>
            <Dropdown.Menu
              aria-label="User menu actions"
              color="secondary"
              onAction={key => navigateDropdown(key)}>
              <Dropdown.Item key="" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  Welcome,
                </Text>
                <Text b color="warning" css={{ d: "flex" }}>
                  Guest!
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="/profile" icon={<TbUser />} withDivider>
                Profile
              </Dropdown.Item>
              <Dropdown.Item key="/help_and_feedback" icon={<TbHelp />}>
                Help & Feedback
              </Dropdown.Item>
              <Dropdown.Item
                key="LOGOUT"
                icon={<TbLogout />}
                withDivider
                color="error">
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Item>
        <ThemeSwitch />
      </Navbar.Content>
    </Navbar>
  );
}
