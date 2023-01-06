import {
  Navbar,
  Text,
  Avatar,
  Dropdown,
  Input,
  Button,
  Link,
} from "@nextui-org/react";
import logo from "../assets/fox.png";
import { TbSearch } from "react-icons/tb";
import Theme from "./Theme";
import Login from "./Login";
import Profile from "./profile";
import { useNavigate } from "react-router-dom";
import React from "react";
import Register from "./register";

export default function Header() {
  const navigate = useNavigate();

  const navigateProfile = () => {
    const path = "/profile";
    navigate(path);
  };

  const navigatePurchases = () => {
    const path = "/purchases";
    navigate(path);
  };

  const navigateLanding = () => {
    const path = "/";
    navigate(path);
  };

  const navigateRegister = () => {
    const path = "/register";
    navigate(path);
  };

  const changePage = (actionKey: React.Key) => {
    const path = `/${actionKey}`;
    navigate(path);
  };
  
  return (
    <Navbar
      disableScrollHandler={true}
      variant="floating"
      css={{
        background: "none",
        "@xsMax": {
          w: "100%",
          jc: "space-between",
        },
      }}
    >
      <Navbar.Brand css={{ mr: "$4" }}>
        <img onClick={navigateLanding} src={logo} alt="Logo" id="logo_nav" />
        <Text b color="inherit" css={{ m: "$10" }} hideIn="sm">
          FOX TICKET
        </Text>
        <Navbar.Content hideIn="sm" variant="highlight">
          <Navbar.Link isActive onPress={navigatePurchases}>
            Purchases
          </Navbar.Link>
          <Navbar.Link onPress={navigateProfile}>Profile</Navbar.Link>
          <Profile />
        </Navbar.Content>
      </Navbar.Brand>
      <Navbar.Content>
        <Navbar.Link hideIn="sm" color="inherit">
          <Login />
        </Navbar.Link>
        <Navbar.Item hideIn="sm">
          <Button auto flat as={Link} onClick={navigateRegister}>
            Sign Up
            <Register />
          </Button>
        </Navbar.Item>
        <Navbar.Item
          hideIn="sm"
          css={{
            "@xsMax": {
              w: "100%",
              jc: "center",
            },
          }}
        >
          <Input
            clearable
            contentLeft={<TbSearch />}
            contentLeftStyling={false}
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

        <Dropdown placement="bottom-right">
          <Navbar.Item>
            <Dropdown.Trigger>
              <Avatar
                bordered
                as="button"
                color="secondary"
                size="md"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </Dropdown.Trigger>
          </Navbar.Item>
          <Dropdown.Menu
            aria-label="User menu actions"
            color="secondary"
            onAction={(actionKey) => changePage(actionKey)}
          >
            <Dropdown.Item key="profile" css={{ height: "$18" }}>
              <Text b color="inherit" css={{ d: "flex" }}>
                Signed in as
              </Text>
              <Text b color="inherit" css={{ d: "flex" }}>
                email@example.com
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key="settings" withDivider>
              My Settings
            </Dropdown.Item>
            <Dropdown.Item key="help_and_feedback">
              Help & Feedback
            </Dropdown.Item>
            <Dropdown.Item key="" withDivider color="error">
              Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Theme />
      </Navbar.Content>
    </Navbar>
  );
}
