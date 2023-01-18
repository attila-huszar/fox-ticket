import React, { useState } from "react";
import { Modal, Input, Button, Text, Spacer } from "@nextui-org/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const [visible, setVisible] = useState(false);

  const validateEmail = (value: string) => {
    return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  };

  const validatePass = (value: string) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,128}$/;
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

  const helperPassConf: help = React.useMemo(() => {
    if (!passwordConf)
      return {
        text: "",
        color: "default",
      };

    const validateMatch = (value: string) => {
      if (value === password) return true;
    };

    const isValidPass = validatePass(passwordConf);
    const isMatching = validateMatch(passwordConf);

    return {
      text: isMatching ? "Passwords Match" : "Passwords Not Matching",
      color: isValidPass && isMatching ? "success" : "warning",
    };
  }, [password, passwordConf]);

  const signUpHandler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    setEmail("");
    setPassword("");
    setPasswordConf("");
  };

  const handleLogin = async () => {
    setVisible(false);
    //setToken(token);
  };

  return (
    <div>
      <Button style={{ fontSize: "1rem" }} auto color="gradient" shadow onClick={signUpHandler}>
        Sign Up
      </Button>
      <Modal closeButton blur aria-labelledby="signup form" open={visible} onClose={closeHandler}>
        <Modal.Header>
          <Text id="signup form" size={18}>
            Please sign up with your email address
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Spacer y={0.2} />
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
          <Spacer y={1.5} />
          <Input.Password
            onChange={e => setPasswordConf(e.target.value)}
            labelPlaceholder="Confirm Password"
            width="350px"
            required
            bordered
            status={helperPassConf.color}
            color={helperPassConf.color}
            helperColor={helperPassConf.color}
            helperText={helperPassConf.text}
            type="password"
            size="lg"
          />
          <Spacer y={0.2} />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto onPress={handleLogin} color="gradient">
            Sign in
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
