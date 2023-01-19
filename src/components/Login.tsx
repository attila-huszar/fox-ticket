import React, { useState } from "react";
import { Modal, Input, Row, Checkbox, Button, Text, Spacer } from "@nextui-org/react";
import { AttentionSeeker } from "react-awesome-reveal";

type ConditonalWrapperProps = {
  children: React.ReactElement;
  condition: boolean;
  wrapper: (children: React.ReactElement) => JSX.Element;
};
const ConditonalWrapper: React.FC<ConditonalWrapperProps> = ({ condition, wrapper, children }) => (condition ? wrapper(children) : children);

export default function Login() {
  const [visLogin, setVisLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (value: string) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i;
    return regex.test(value);
  };

  const validatePass = (value: string) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/;
    return regex.test(value);
  };

  interface help {
    text: string;
    color: "success" | "warning" | "default" | "primary" | "secondary" | "error" | undefined;
  }

  const helperEmail: help = React.useMemo(() => {
    if (!email)
      return {
        text: "",
        color: "default",
      };
    const isValid = validateEmail(email);

    return {
      text: isValid ? "Valid email" : "Enter a valid email",
      color: isValid ? "success" : "warning",
    };
  }, [email]);

  const helperPass: help = React.useMemo(() => {
    if (!password)
      return {
        text: "",
        color: "default",
      };
    const isValidPass = validatePass(password);

    return {
      text: isValidPass ? "Valid password" : "Minimum eight characters, at least one letter and one number",
      color: isValidPass ? "success" : "warning",
    };
  }, [password]);

  const LoginBtnHandler = () => setVisLogin(true);

  const closeHandler = () => {
    setVisLogin(false);
    setEmail("");
    setPassword("");
  };

  const loginHandler = () => {
    setVisLogin(false);
    //setToken(token);
  };

  return (
    <div>
      <Button
        css={{
          fontSize: "1rem",
          "&:hover, &:focus": {
            boxShadow: "0 4px 14px 0 var(--nextui-colors-hoverShadow)",
          },
        }}
        auto
        color="secondary"
        shadow
        onClick={LoginBtnHandler}>
        Login
      </Button>
      <Modal closeButton blur aria-labelledby="login form" open={visLogin} onClose={closeHandler}>
        <Modal.Header>
          <Text size={18}>
            Welcome to{" "}
            <Text
              b
              size={18}
              css={{
                textGradient: "45deg, $blue600 -20%, $pink600 50%",
              }}>
              Fox Ticket
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Spacer y={0.2} />
          <ConditonalWrapper condition={validateEmail(email)} wrapper={(wrappedChildren: any) => <AttentionSeeker effect="headShake">{wrappedChildren}</AttentionSeeker>}>
            <Input
              onChange={e => setEmail(e.target.value)}
              required
              bordered
              status={helperEmail.color}
              color={helperEmail.color}
              helperColor={helperEmail.color}
              helperText={helperEmail.text}
              fullWidth
              labelPlaceholder="Email"
              size="lg"
            />
          </ConditonalWrapper>
          <Spacer y={1.5} />
          <Input.Password
            onChange={e => setPassword(e.target.value)}
            required
            bordered
            status={helperPass.color}
            color={helperPass.color}
            helperColor={helperPass.color}
            helperText={helperPass.text}
            type="password"
            labelPlaceholder="Password"
            size="lg"
          />
          <Spacer y={0.2} />
          <Row justify="space-between">
            <Checkbox color="secondary">
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <Text size={14}>Forgot password?</Text>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto onPress={loginHandler} color="gradient">
            Sign in
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
