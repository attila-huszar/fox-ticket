import React, { useState } from "react";
import {
  Modal,
  Input,
  Row,
  Checkbox,
  Button,
  Text,
  Spacer,
} from "@nextui-org/react";
import {
  validateEmail,
  validatePassword,
} from "../helper/inputFieldValidators";
import { InputField } from "../interfaces/InputFieldHelper";
import "../styles/inputFieldHelper.css";

export default function Login() {
  const [visLogin, setVisLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [shakeEmail, setShakeEmail] = useState(false);
  const [shakePass, setShakePass] = useState(false);

  const emailHelper: InputField = React.useMemo(() => {
    if (!email)
      return {
        text: "",
        color: "default",
      };
    const isValidEmail = validateEmail(email);

    return {
      text: isValidEmail ? "Valid email" : "Please enter a valid email address",
      color: isValidEmail ? "success" : "warning",
    };
  }, [email]);

  const passHelper: InputField = React.useMemo(() => {
    if (!pass)
      return {
        text: "",
        color: "default",
      };
    const isValidPass = validatePassword(pass);

    return {
      text: isValidPass
        ? "Valid password"
        : "Please enter minimum eight characters",
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
    if (!email) {
      setShakeEmail(prevCheck => !prevCheck);
      emailHelper.color = "error";
      emailHelper.text = "Please enter your email address";
    } else if (validateEmail(email) === false) {
      setShakeEmail(prevCheck => !prevCheck);
      emailHelper.color = "error";
    }
    if (!pass) {
      setShakePass(prevCheck => !prevCheck);
      passHelper.color = "error";
      passHelper.text = "Please enter your password";
    } else if (validatePassword(pass) === false) {
      setShakePass(prevCheck => !prevCheck);
      passHelper.color = "error";
    }
    setTimeout(() => setShakeEmail(false), 1000);
    setTimeout(() => setShakePass(false), 1000);
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
      <Modal
        closeButton
        blur
        aria-labelledby="login form"
        open={visLogin}
        onClose={closeHandler}>
        <Modal.Header>
          <Text size={26}>Welcome to&nbsp; </Text>
          <Text
            size={28}
            css={{
              textGradient: "45deg, $blue600 -20%, $pink600 50%",
              letterSpacing: "$wide",
            }}>
            <strong>Fox</strong>Ticket
          </Text>
        </Modal.Header>
        <hr
          style={{
            color: "#f2f2f2",
            height: 5,
          }}
        />
        <Modal.Body>
          <Spacer y={0.2} />
          <Input
            className={shakeEmail ? "shake" : ""}
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
          <Spacer y={1.5} />
          <Input.Password
            className={shakePass ? "shake" : ""}
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
