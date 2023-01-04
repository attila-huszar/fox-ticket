import { useNavigate, NavLink } from "react-router-dom";
import { Navbar, Text, Avatar, Dropdown, Input, Button } from "@nextui-org/react";
import logo from "../assets/fox.png";
import { TbHelp, TbLogout, TbSearch, TbUser } from "react-icons/tb";
import Theme from "./Theme";
import Login from "./Login";
import "./Header.css";

export default function Header() {
  // const [isShown, setIsShown] = useState(false);
  // const handleClick = () => {
  //   setIsShown((current: any) => !current);
  // };

  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiam9obiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3Mjg0OTc1NSwiZXhwIjoxNjcyODUwMzU1fQ.QX_zMO5kwum8vMYUxHCP0jfxbtGILXr1Fcn0v1ADi1o";

  async function logout() {
    await fetch("http://localhost:5000/logout", {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        //'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      // referrer: "http://localhost:5000",
      // referrerPolicy: "unsafe-url",
    });
  }

  const navigate = useNavigate();

  const navigateDropdown = (key: React.Key) => {
    if (key === "LOGOUT") {
      logout();
    } else {
      let path = String(key);
      navigate(path);
    }
  };

  return (
    <Navbar
      isBordered
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
        <img src={logo} alt="Logo" style={{ width: "50px", height: "auto" }} />
        <Text b color="inherit" css={{ m: "$10" }} hideIn="sm">
          FOX TICKET
        </Text>
        <Navbar.Content hideIn="sm">
          <NavLink to="/" className={({ isActive }) => (isActive ? "activeLink" : "inactiveLink")}>
            Events
          </NavLink>
          <NavLink to="/tickets" className={({ isActive }) => (isActive ? "activeLink" : "inactiveLink")}>
            Tickets
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => (isActive ? "activeLink" : "inactiveLink")}>
            Cart
          </NavLink>
        </Navbar.Content>
      </Navbar.Brand>

      <Navbar.Content>
        <Navbar.Item hideIn="sm">
          <Login />
          {/* <Button auto shadow color="warning" icon={<TbLogin />}>
            Login
            {isShown && <Login />}
          </Button> */}
        </Navbar.Item>

        <Navbar.Item hideIn="sm">
          <Button auto shadow color={"secondary"}>
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
            contentRight={<TbSearch style={{ color: "grey" }} />}
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
              <Dropdown.Item key="" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  Signed in as
                </Text>
                <Text b color="warning" css={{ d: "flex" }}>
                  admin@foxticket.com
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="/profile" icon={<TbUser />} withDivider>
                Profile
              </Dropdown.Item>
              <Dropdown.Item key="/help_and_feedback" icon={<TbHelp />}>
                Help & Feedback
              </Dropdown.Item>
              <Dropdown.Item key="LOGOUT" icon={<TbLogout />} withDivider color="error">
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
