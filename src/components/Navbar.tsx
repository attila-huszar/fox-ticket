import { useNavigate } from "react-router-dom";
import { Navbar, Text, Avatar, Dropdown, Input, Button, Link } from "@nextui-org/react";
import logo from "../assets/fox.png";
import { TbHelp, TbLogout, TbSearch, TbSettings } from "react-icons/tb";
import Theme from "./Theme";
import Login from "./Login";
import React from "react";

export default function Header() {
  const navigate = useNavigate();
  const navigateRoot = () => {
    let path = "/";
    navigate(path);
  };
  const navigateCart = () => {
    let path = "/cart";
    navigate(path);
  };
  const navigateDropdown = (key: React.Key) => {
    let path: string = String(key);
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
      }}>
      <Navbar.Brand css={{ mr: "$4" }}>
        <img src={logo} alt="Logo" id="logo_nav" />
        <Text b color="inherit" css={{ m: "$10" }} hideIn="sm">
          FOX TICKET
        </Text>
        <Navbar.Content hideIn="sm" variant="highlight">
          <Navbar.Link isActive onPress={navigateRoot}>
            News
          </Navbar.Link>
          <Navbar.Link onPress={navigateCart}>Tickets</Navbar.Link>
          <Navbar.Link onPress={navigateCart}>Cart</Navbar.Link>
        </Navbar.Content>
      </Navbar.Brand>

      <Navbar.Content>
        <Navbar.Link hideIn="sm" color="inherit" href="#">
          <Login />
        </Navbar.Link>

        <Navbar.Item hideIn="sm">
          <Button auto flat as={Link} href="#">
            Sign Up
          </Button>
        </Navbar.Item>

        <Navbar.Item
          hideIn="sm"
          css={{
            "@xsMax": {
              w: "100%",
              jc: "center",
            },
          }}>
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

        <Navbar.Item>
          <Dropdown placement="bottom-right">
            <Dropdown.Trigger>
              <Avatar bordered as="button" color="secondary" size="md" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
            </Dropdown.Trigger>
            <Dropdown.Menu aria-label="User menu actions" color="secondary" onAction={key => navigateDropdown(key)}>
              <Dropdown.Item key="/profile" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  Signed in as
                </Text>
                <Text b color="inherit" css={{ d: "flex" }}>
                  email@example.com
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="/settings" icon={<TbSettings />} withDivider>
                My Settings
              </Dropdown.Item>
              <Dropdown.Item key="/help_and_feedback" icon={<TbHelp />}>
                Help & Feedback
              </Dropdown.Item>
              <Dropdown.Item key="/logout" icon={<TbLogout />} withDivider color="error">
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Item>
        <Theme />
      </Navbar.Content>
    </Navbar>
  );
}
