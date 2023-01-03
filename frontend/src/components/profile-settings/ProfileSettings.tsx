import { Button, Input, Spacer, Grid, Text, Col, Row } from "@nextui-org/react";
import { useState } from "react";

export default function ProfileSettings() {
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = () => {
    setErrorMessage("A field is required to be changed.");
  };
  return (
    <Grid.Container justify="center" alignItems="center" alignContent="center">
      <Text h1>My Settings</Text>
      <Col css={{ textAlign: "center" }}>
        <Input width="214px" labelPlaceholder="Username" />
        <Spacer y={1.6} />
        <Input width="214px" labelPlaceholder="Email" />
        <Spacer y={1.6} />
        <Input.Password width="214px" labelPlaceholder="Old Password" />
        <Spacer y={1.6} />
        <Input.Password width="214px" labelPlaceholder="New Password" />
        <Spacer y={1.6} />
        <Input.Password width="214px" labelPlaceholder="New Password Again" />
        <Text css={{ color: "red" }}>{errorMessage}</Text>
      </Col>
      <Button shadow size="lg" auto color="gradient" rounded id="submit" onPress={handleClick}>
        Submit
      </Button>
    </Grid.Container>
  );
}
