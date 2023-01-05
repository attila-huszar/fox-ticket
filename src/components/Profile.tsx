import { useState } from "react";
import { Button, Input, Grid, Text } from "@nextui-org/react";
import { TbSend } from "react-icons/tb";

export default function Profile() {
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = () => {
    setErrorMessage("A field is required to be changed.");
  };

  return (
    <Grid.Container justify="center" style={{ display: "flex", gap: "40px", margin: "20px auto", padding:"15px", width: "450px", border: "4px solid var(--nextui-colors-navbarActive)", borderRadius: "12px" }}>
      <Text h3>My Profile</Text>
      <Input width="350px" labelPlaceholder="Username" />
      <Input width="350px" labelPlaceholder="Email" />
      <Input.Password width="350px" labelPlaceholder="Current Password" />
      <Input.Password width="350px" labelPlaceholder="New Password" />
      <Input.Password width="350px" labelPlaceholder="Confirm Password" />
      <Button shadow auto color="gradient" id="submit" onPress={handleClick} icon={<TbSend />}>
        Submit
      </Button>
    </Grid.Container>
  );
}
