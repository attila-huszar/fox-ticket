import { useNavigate } from "react-router-dom";
import { Dropdown, Avatar, Text } from "@nextui-org/react";
import { TbHelp, TbLogout, TbUser } from "react-icons/tb";
import profile_defpic from "../static/profile_def.png";

export default function ProfileDropdown() {
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
  );
}
