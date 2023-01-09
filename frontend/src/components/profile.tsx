import React, { useState } from "react";
import { Button, Input, Text, Spacer, Modal, Col, Row, Container } from "@nextui-org/react";
import profile_defpic from "../static/profile_def.png";

export default function Profile() {
  const [visChangeUser, setVisChangeUser] = useState(false);
  const [visChangePass, setVisChangePass] = useState(false);
  const [passwordOld, setPasswordOld] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const userChangeBtnHandler = () => setVisChangeUser(true);
  const passChangeBtnHandler = () => setVisChangePass(true);

  const closeHandler = () => {
    setVisChangeUser(false);
    setVisChangePass(false);
    setPasswordOld("");
    setPasswordNew("");
    setPasswordConf("");
  };

  const validatePass = (value: string) => {
    return value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/);
  };
  const validateMatch = (value: string) => {
    if (value === passwordNew) return true;
  };

  interface help {
    text: string;
    color: "success" | "warning" | "default" | "primary" | "secondary" | "error" | undefined;
  }

  const helperPassOld: help = React.useMemo(() => {
    if (!passwordOld)
      return {
        text: "",
        color: "default",
      };
    const isValidPass = validatePass(passwordOld);

    return {
      text: isValidPass ? "Valid password" : "Minimum eight characters, at least one letter and one number",
      color: isValidPass ? "success" : "warning",
    };
  }, [passwordOld]);

  const helperPassNew: help = React.useMemo(() => {
    if (!passwordNew)
      return {
        text: "",
        color: "default",
      };
    const isValidPass = validatePass(passwordNew);

    return {
      text: isValidPass ? "Valid password" : "Minimum eight characters, at least one letter and one number",
      color: isValidPass ? "success" : "warning",
    };
  }, [passwordNew]);

  const helperPassConf: help = React.useMemo(() => {
    if (!passwordConf)
      return {
        text: "",
        color: "default",
      };
    const isValidPass = validateMatch(passwordConf);

    return {
      text: isValidPass ? "Passwords Match" : "Passwords Not Matching",
      color: isValidPass ? "success" : "warning",
    };
  }, [passwordConf]);

  return (
    <Container
      fluid
      wrap="wrap"
      justify="center"
      style={{
        margin: "20px auto",
        minWidth: "450px",
        maxWidth: "800px",
        border: "4px solid var(--nextui-colors-navbarActive)",
        borderRadius: "12px",
      }}
    >
      <Row>
        <Text
          size={30}
          css={{
            margin: "auto",
            textGradient: "45deg, $blue600 -20%, $pink600 50%",
          }}
          weight="bold"
        >
          My Profile
        </Text>
      </Row>
      <Spacer y={2} />
      <Row>
        <Col>
          <img
            src={profile_defpic}
            style={{ borderRadius: "50%", padding: "5px", border: "5px solid var(--nextui-colors-navbarActive)", width: "200px", height: "auto", margin: "auto" }}
            alt="profile"
          />
          <Spacer y={2} />
          <Button style={{ fontSize: "1rem", margin: "auto" }} auto color="secondary" shadow>
            Change Picture
          </Button>
        </Col>
        <Col>
          <Input readOnly underlined width="100%" style={{ margin: "auto" }} labelLeft="Email" value={" admin@foxticket.com"} />
          <Spacer y={2} />
          <Input underlined width="100%" style={{ margin: "auto" }} labelLeft="Username" value={" Admin"} />
          <Spacer y={2} />
          <Row>
            <Button style={{ fontSize: "1rem", margin: "auto" }} shadow color="gradient" id="submit" onPress={userChangeBtnHandler}>
              Change Username
            </Button>
            <Spacer y={2} />
            <Button style={{ fontSize: "1rem", margin: "auto" }} color="primary" shadow onClick={passChangeBtnHandler}>
              Change Password
            </Button>
          </Row>
        </Col>
      </Row>
      <Spacer y={2} />

      <Modal closeButton blur aria-labelledby="username change form" open={visChangeUser} onClose={closeHandler}>
        <Modal.Header>
          <Text size={18}>Change your Username</Text>
        </Modal.Header>
        <Modal.Body>
          <Spacer y={0.4} />
          <Input onChange={e => setPasswordOld(e.target.value)} labelPlaceholder="New Username" width="350px" required bordered size="lg" />

          <Spacer y={0.4} />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto color="gradient" onPress={closeHandler}>
            Change
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal closeButton blur aria-labelledby="password change form" open={visChangePass} onClose={closeHandler}>
        <Modal.Header>
          <Text size={18}>Change your Password</Text>
        </Modal.Header>
        <Modal.Body>
          <Spacer y={0.4} />
          <Input.Password
            onChange={e => setPasswordOld(e.target.value)}
            labelPlaceholder="Current Password"
            width="350px"
            required
            bordered
            status={helperPassOld.color}
            color={helperPassOld.color}
            helperColor={helperPassOld.color}
            helperText={helperPassOld.text}
            type="password"
            size="lg"
          />
          <Spacer y={1.6} />
          <Input.Password
            onChange={e => setPasswordNew(e.target.value)}
            labelPlaceholder="New Password"
            width="350px"
            required
            bordered
            status={helperPassNew.color}
            color={helperPassNew.color}
            helperColor={helperPassNew.color}
            helperText={helperPassNew.text}
            type="password"
            size="lg"
          />
          <Spacer y={1.6} />
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
          <Spacer y={0.4} />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto color="gradient" onPress={closeHandler}>
            Change
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
