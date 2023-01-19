import React, { useState } from "react";
import { Modal, Input, Row, Checkbox, Button, Text, Spacer } from "@nextui-org/react";
import { AttentionSeeker } from "react-awesome-reveal";
import { ConditionalWrap } from "../utils/ConditionalWrap";
import { validateEmail, validatePass } from "../utils/inputFieldValidators";
import { InputFieldHelper } from "../interfaces/InputFieldHelper";

export default function Login() {
  const [visLogin, setVisLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const emailHelper: InputFieldHelper = React.useMemo(() => {
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

  const passHelper: InputFieldHelper = React.useMemo(() => {
    if (!pass)
      return {
        text: "",
        color: "default",
      };
    const isValidPass = validatePass(pass);

    return {
      text: isValidPass ? "Valid password" : "Minimum eight characters, at least one letter and one number",
      color: isValidPass ? "success" : "warning",
    };
  }, [pass]);

  const LoginBtnHandler = () => setVisLogin(true);

  const closeHandler = () => {
    setVisLogin(false);
    setEmail("");
    setPass("");
  };

  const loginHandler = () => {
    if (validateEmail(email) === false || validatePass(pass) === false) {
      return true;
    } else {
      setVisLogin(false);
      return false;
    }
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
          <ConditionalWrap condition={loginHandler()} wrapper={(wrappedChildren: any) => <AttentionSeeker effect="headShake">{wrappedChildren}</AttentionSeeker>}>
            <Input
              onChange={e => setEmail(e.target.value)}
              required
              bordered
              status={emailHelper.color}
              color={emailHelper.color}
              helperColor={emailHelper.color}
              helperText={emailHelper.text}
              fullWidth
              labelPlaceholder="Email"
              size="lg"
            />
          </ConditionalWrap>
          <Spacer y={1.5} />
          <Input.Password
            onChange={e => setPass(e.target.value)}
            required
            bordered
            status={passHelper.color}
            color={passHelper.color}
            helperColor={passHelper.color}
            helperText={passHelper.text}
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
