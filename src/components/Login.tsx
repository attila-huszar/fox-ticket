import React from "react";
import { Modal, Input, Row, Checkbox, Button, Text, Spacer } from "@nextui-org/react";
import { Mail } from "./Mail";
import { Password } from "./Password";

export default function Login() {
  const [token, setToken] = React.useState(null);
  const [visible, setVisible] = React.useState(false);

  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const handleLogin = async () => {
    setVisible(false);
    //const token = await fakeAuth();
    //setToken(token);
  };
  
  return (
    <div>
      <Button auto color="warning" shadow onClick={handler}>
        Login
      </Button>
      <Modal closeButton blur aria-labelledby="modal-title" open={visible} onClose={closeHandler}>
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Welcome to
            <Text b size={18}>
              {" "}
              Fox Ticket
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Spacer y={0.4} />
          <Input clearable underlined fullWidth labelPlaceholder="Email" color="secondary" size="lg" contentLeft={<Mail fill="currentColor" size={undefined} height={undefined} width={undefined} />} />
          <Spacer y={0.6} />
          <Input clearable underlined fullWidth labelPlaceholder="Password" color="secondary" size="lg" contentLeft={<Password fill="currentColor" size={undefined} height={60} width={undefined} />} />
          <Spacer y={0.2} />
          <Row justify="space-between">
            <Checkbox color="secondary">
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <Text size={14}>Forgot password?</Text>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
          <Button auto onClick={handleLogin} color="secondary">
            Sign in
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
