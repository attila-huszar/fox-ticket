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
        ? `Nice to meet you ${name}!`
        : "Please only use common formats",
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
        ? "Valid email"
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
    if (name.length === 0) {
      setShakeName(true);
      nameHelper.color = "error";
      nameHelper.text = "Please fill this field";
    }
    if (email.length === 0) {
      setShakeEmail(true);
      emailHelper.color = "error";
      emailHelper.text = "Please fill this field";
    }
    if (password.length === 0) {
      setShakePassword(true);
      passHelper.color = "error";
      passHelper.text = "Please fill this field";
    }
    if (passwordConf.length === 0) {
      setShakePasswordConf(true);
      passConfHelper.color = "error";
      passConfHelper.text = "Please fill this field";
    }
    if (validateName(name) === false) {
      setShakeName(true);
      nameHelper.color = "error";
    }
    if (validateEmail(email) === false) {
      setShakeEmail(true);
      emailHelper.color = "error";
    }
    if (validatePassword(password) === false) {
      setShakePassword(true);
      passHelper.color = "error";
    }
    if (validateMatch(password, passwordConf) === false) {
      setShakePasswordConf(true);
      passConfHelper.color = "error";
    }

    setTimeout(() => setShakeName(false), 1000);
    setTimeout(() => setShakeEmail(false), 1000);
    setTimeout(() => setShakePassword(false), 1000);
    setTimeout(() => setShakePasswordConf(false), 1000);

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
        setModalVisible(false);
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
        <hr
          style={{
            color: "#f2f2f2",
            height: 5,
          }}
        />
        <Modal.Body>
          <Spacer y={0.2} />
          <Input
            className={shakeName ? "shake" : ""}
            onChange={e => setName(e.target.value)}
            required
            bordered
            status={nameHelper.color}
            color={nameHelper.color}
            helperColor={nameHelper.color}
            helperText={nameHelper.text}
            labelPlaceholder="Name"
            size="lg"
          />
          <Spacer y={1.5} />
          <Input
            className={shakeEmail ? "shake" : ""}
            onChange={e => setEmail(e.target.value)}
            required
            bordered
            status={emailHelper.color}
            color={emailHelper.color}
            helperColor={emailHelper.color}
            helperText={emailHelper.text}
            labelPlaceholder="Email"
            size="lg"
          />
          <Spacer y={1.5} />
          <Input.Password
            className={shakePassword ? "shake" : ""}
            onChange={e => setPassword(e.target.value)}
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
            className={shakePasswordConf ? "shake" : ""}
            onChange={e => setPasswordConf(e.target.value)}
            labelPlaceholder="Confirm Password"
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
          <Button auto onPress={signUpHandler} color="gradient">
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
