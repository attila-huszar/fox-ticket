import React, { useState } from "react";
import { Modal, Input, Button, Text, Spacer } from "@nextui-org/react";
import {
  validateEmail,
  validateName,
  validatePassword,
  validateMatch,
} from "../helper/inputFieldValidators";
import { InputFieldHelper } from "../interfaces/InputFieldHelper";
import "../styles/inputFieldHelper.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fetchRegister from "../api/fetchRegister";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [shakeName, setShakeName] = useState(false);
  const [shakeEmail, setShakeEmail] = useState(false);
  const [shakePassword, setShakePassword] = useState(false);
  const [shakePasswordConf, setShakePasswordConf] = useState(false);

  const nameHelper: InputFieldHelper = React.useMemo(() => {
    if (!name)
      return {
        text: "",
        color: "default",
      };
    const isValid = validateName(name);

    return {
      text: isValid
        ? `Nice to meet you ${name}`
        : "Please enter minimum 3 characters",
      color: isValid ? "success" : "warning",
    };
  }, [name]);

  const emailHelper: InputFieldHelper = React.useMemo(() => {
    if (!email)
      return {
        text: "",
        color: "default",
      };
    const isValid = validateEmail(email);

    return {
      text: isValid
        ? "Valid email address"
        : "Please enter a valid email address",
      color: isValid ? "success" : "warning",
    };
  }, [email]);

  const passHelper: InputFieldHelper = React.useMemo(() => {
    if (!password)
      return {
        text: "",
        color: "default",
      };

    const isValidPass = validatePassword(password);

    return {
      text: isValidPass
        ? "Valid password"
        : "Please enter minimum eight characters",
      color: isValidPass ? "success" : "warning",
    };
  }, [password]);

  const passConfHelper: InputFieldHelper = React.useMemo(() => {
    if (!passwordConf)
      return {
        text: "",
        color: "default",
      };

    const isValidPass = validatePassword(passwordConf);
    const isMatching = validateMatch(password, passwordConf);

    return {
      text: isMatching ? "Passwords match" : "Passwords not matching",
      color: isValidPass && isMatching ? "success" : "warning",
    };
  }, [password, passwordConf]);

  const closeHandler = () => {
    setModalVisible(false);
    setName("");
    setEmail("");
    setPassword("");
    setPasswordConf("");
  };

  const signUpHandler = async () => {
    if (!name) {
      setShakeName(prevCheck => !prevCheck);
      nameHelper.color = "error";
      nameHelper.text = "Please fill this field";
    }
    if (!email) {
      setShakeEmail(prevCheck => !prevCheck);
      emailHelper.color = "error";
      emailHelper.text = "Please fill this field";
    }
    if (!password) {
      setShakePassword(prevCheck => !prevCheck);
      passHelper.color = "error";
      passHelper.text = "Please fill this field";
    }
    if (!passwordConf) {
      setShakePassword(prevCheck => !prevCheck);
      passConfHelper.color = "error";
      passConfHelper.text = "Please fill this field";
    }
    if (validateName(name) === false) {
      setShakeName(prevCheck => !prevCheck);
      nameHelper.color = "error";
    }
    if (validateEmail(email) === false) {
      setShakeEmail(prevCheck => !prevCheck);
      emailHelper.color = "error";
    }
    if (validatePassword(password) === false) {
      setShakePassword(prevCheck => !prevCheck);
      passHelper.color = "error";
    }
    if (validatePassword(passwordConf) === false) {
      setShakePasswordConf(prevCheck => !prevCheck);
      passConfHelper.color = "error";
    }

    setTimeout(() => setShakeEmail(false), 1000);
    setTimeout(() => setShakePassword(false), 1000);

    if (
      validateName(name) &&
      validateEmail(email) &&
      validatePassword(password) &&
      validateMatch(password, passwordConf)
    ) {
      try {
        const useremail = await fetchRegister({ name, email, password });
        const notify = () =>
          toast.success(
            `${useremail} successfully signed up! Please, verify your email address.`,
            {
              position: "top-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            }
          );
        notify();
      } catch (error) {
        if (error instanceof Error) {
          emailHelper.text = error.message[1][0].replace(
            "Validation error: ",
            ""
          );
        }
        return;
      }
    }
    setModalVisible(false);
  };

  return (
    <>
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
        onClick={() => setModalVisible(true)}>
        Sign Up
      </Button>
      <Modal
        closeButton
        blur
        aria-labelledby="signup form"
        open={modalVisible}
        onClose={closeHandler}>
        <Modal.Header>
          <Text id="signup form" size={18}>
            Please sign up with your name and email address
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Spacer y={0.2} />
          <Input
            onChange={e => setName(e.target.value)}
            required
            status={nameHelper.color}
            color={nameHelper.color}
            helperColor={nameHelper.color}
            helperText={nameHelper.text}
            fullWidth
            labelPlaceholder="Name"
            size="lg"
          />
          <Spacer y={1.5} />
          <Input
            onChange={e => setEmail(e.target.value)}
            required
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
            onChange={e => setPassword(e.target.value)}
            required
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
            onChange={e => setPasswordConf(e.target.value)}
            labelPlaceholder="Confirm Password"
            width="350px"
            required
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
          <Button auto onPress={signUpHandler} color="gradient">
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
