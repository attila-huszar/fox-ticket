import React, { useState } from "react";
import { Modal, Input, Button, Text, Spacer } from "@nextui-org/react";
import { validateEmail, validatePass } from "../utils/inputFieldValidators";
import { InputFieldHelper } from "../interfaces/InputFieldHelper";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [passConf, setPassConf] = useState("");
  const [visible, setVisible] = useState(false);

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

  const passConfHelper: InputFieldHelper = React.useMemo(() => {
    if (!passConf)
      return {
        text: "",
        color: "default",
      };

    const validateMatch = (value: string) => {
      if (value === pass) return true;
    };

    const isValidPass = validatePass(passConf);
    const isMatching = validateMatch(passConf);

    return {
      text: isMatching ? "Passwords Match" : "Passwords Not Matching",
      color: isValidPass && isMatching ? "success" : "warning",
    };
  }, [pass, passConf]);

  const signUpHandler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    setEmail("");
    setPass("");
    setPassConf("");
  };

  const handleLogin = async () => {
    setVisible(false);
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
        color="gradient"
        shadow
        onClick={signUpHandler}>
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
          <Spacer y={1.5} />
          <Input.Password
            onChange={e => setPassConf(e.target.value)}
            labelPlaceholder="Confirm Password"
            width="350px"
            required
            bordered
            status={passConfHelper.color}
            color={passConfHelper.color}
            helperColor={passConfHelper.color}
            helperText={passConfHelper.text}
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
