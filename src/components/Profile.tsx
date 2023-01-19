import React, { useState } from "react";
import {
  Button,
  Input,
  Text,
  Spacer,
  Modal,
  Col,
  Row,
  Container,
} from "@nextui-org/react";
import { Fade } from "react-awesome-reveal";
import profile_defpic from "../static/profile_def.png";
import { validatePass } from "../utils/inputFieldValidators";
import { InputFieldHelper } from "../interfaces/InputFieldHelper";

export default function Profile() {
  const [visChangeUser, setVisChangeUser] = useState(false);
  const [visChangePass, setVisChangePass] = useState(false);
  const [passOld, setPassOld] = useState("");
  const [passNew, setPassNew] = useState("");
  const [passConf, setPassConf] = useState("");

  const userChangeBtnHandler = () => setVisChangeUser(true);
  const passChangeBtnHandler = () => setVisChangePass(true);

  const closeHandler = () => {
    setVisChangeUser(false);
    setVisChangePass(false);
    setPassOld("");
    setPassNew("");
    setPassConf("");
  };

  const passOldHelper: InputFieldHelper = React.useMemo(() => {
    if (!passOld)
      return {
        text: "",
        color: "default",
      };
    const isValidPass = validatePass(passOld);

    return {
      text: isValidPass
        ? "Valid password"
        : "Minimum eight characters, at least one letter and one number",
      color: isValidPass ? "success" : "warning",
    };
  }, [passOld]);

  const passNewHelper: InputFieldHelper = React.useMemo(() => {
    if (!passNew)
      return {
        text: "",
        color: "default",
      };

    const isValidPass = validatePass(passNew);

    return {
      text: isValidPass
        ? "Valid password"
        : "Minimum eight characters, at least one letter and one number",
      color: isValidPass ? "success" : "warning",
    };
  }, [passNew]);

  const passConfHelper: InputFieldHelper = React.useMemo(() => {
    if (!passConf)
      return {
        text: "",
        color: "default",
      };

    const validateMatch = (value: string) => {
      if (value === passNew) return true;
    };

    const isValidPass = validatePass(passConf);
    const isMatching = validateMatch(passConf);

    return {
      text: isMatching ? "Passwords Match" : "Passwords Not Matching",
      color: isValidPass && isMatching ? "success" : "warning",
    };
  }, [passNew, passConf]);

  return (
    <Fade duration={1000}>
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
        }}>
        <Row>
          <Text
            size={30}
            css={{
              margin: "auto",
              textGradient: "45deg, $blue600 -20%, $pink600 50%",
            }}
            weight="bold">
            My Profile
          </Text>
        </Row>
        <Spacer y={2} />
        <Row>
          <Col>
            <img
              src={profile_defpic}
              style={{
                borderRadius: "50%",
                padding: "5px",
                border: "5px solid var(--nextui-colors-navbarActive)",
                width: "200px",
                height: "auto",
                margin: "auto",
              }}
              alt="profile"
            />
            <Row style={{ bottom: "10px" }}>
              <Button
                style={{ fontSize: "1rem", margin: "auto" }}
                auto
                color="secondary"
                shadow>
                Change Picture
              </Button>
            </Row>
          </Col>
          <Col>
            <Input
              readOnly
              underlined
              width="100%"
              style={{ margin: "auto" }}
              labelLeft="Email"
              value={" admin@foxticket.com"}
            />
            <Spacer y={2} />
            <Input
              underlined
              width="100%"
              style={{ margin: "auto" }}
              labelLeft="Username"
              value={" Admin"}
            />
            <Spacer y={2} />
            <Row style={{ bottom: "10px" }}>
              <Button
                style={{ fontSize: "1rem", margin: "auto" }}
                shadow
                color="gradient"
                id="submit"
                onPress={userChangeBtnHandler}>
                Change Username
              </Button>
              <Spacer y={2} />
              <Button
                style={{ fontSize: "1rem", margin: "auto" }}
                color="primary"
                shadow
                onClick={passChangeBtnHandler}>
                Change Password
              </Button>
            </Row>
          </Col>
        </Row>
        <Spacer y={2} />

        <Modal
          closeButton
          blur
          aria-labelledby="username change form"
          open={visChangeUser}
          onClose={closeHandler}>
          <Modal.Header>
            <Text size={18}>Change your Username</Text>
          </Modal.Header>
          <Modal.Body>
            <Spacer y={0.4} />
            <Input
              onChange={e => setPassOld(e.target.value)}
              labelPlaceholder="New Username"
              width="350px"
              required
              bordered
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

        <Modal
          closeButton
          blur
          aria-labelledby="password change form"
          open={visChangePass}
          onClose={closeHandler}>
          <Modal.Header>
            <Text size={18}>Change your Password</Text>
          </Modal.Header>
          <Modal.Body>
            <Spacer y={0.4} />
            <Input.Password
              onChange={e => setPassOld(e.target.value)}
              labelPlaceholder="Current Password"
              width="350px"
              required
              bordered
              status={passOldHelper.color}
              color={passOldHelper.color}
              helperColor={passOldHelper.color}
              helperText={passOldHelper.text}
              type="password"
              size="lg"
            />
            <Spacer y={1.6} />
            <Input.Password
              onChange={e => setPassNew(e.target.value)}
              labelPlaceholder="New Password"
              width="350px"
              required
              bordered
              status={passNewHelper.color}
              color={passNewHelper.color}
              helperColor={passNewHelper.color}
              helperText={passNewHelper.text}
              type="password"
              size="lg"
            />
            <Spacer y={1.6} />
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
    </Fade>
  );
}
