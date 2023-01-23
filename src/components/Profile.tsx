import React, { useState } from "react";
import { Zoom } from "react-awesome-reveal";
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
import profile_defpic from "../static/profile_def.png";
import { validatePassword } from "../helper/inputFieldValidators";
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
    const isValidPass = validatePassword(passOld);

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

    const isValidPass = validatePassword(passNew);

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

    const isValidPass = validatePassword(passConf);
    const isMatching = validateMatch(passConf);

    return {
      text: isMatching ? "Passwords Match" : "Passwords Not Matching",
      color: isValidPass && isMatching ? "success" : "warning",
    };
  }, [passNew, passConf]);

  return (
    <>
      <Zoom duration={750}>
        <Container
          style={{
            margin: "50px auto",
            padding: "20px",
            minWidth: "450px",
            maxWidth: "800px",
            height: "450px",
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
            <Col style={{ margin: "auto" }}>
              <img
                src={profile_defpic}
                style={{
                  margin: "0 auto",
                  borderRadius: "50%",
                  padding: "5px",
                  border: "5px solid var(--nextui-colors-navbarActive)",
                  width: "220px",
                  aspectRatio: "1",
                  height: "auto",
                }}
                alt="profile"
              />
            </Col>
            <Col>
              <Input
                readOnly
                underlined
                width="100%"
                size="lg"
                labelLeft="Email"
                value={" admin@foxticket.com"}
              />
              <Spacer y={1.5} />
              <Input
                underlined
                width="100%"
                size="lg"
                labelLeft="Username"
                value={" Admin"}
              />
            </Col>
          </Row>
          <Spacer y={-2} />
          <Row align="baseline">
            <Col>
              <Button
                style={{
                  fontSize: "0.9rem",
                  margin: "auto",
                }}
                auto
                color="secondary"
                shadow>
                Change Picture
              </Button>
            </Col>
            <Col>
              <Button
                style={{
                  fontSize: "0.9rem",
                  margin: "auto",
                }}
                shadow
                color="gradient"
                id="submit"
                onPress={userChangeBtnHandler}>
                Change Username
              </Button>
              <Spacer y={1.5} />
              <Button
                style={{
                  fontSize: "0.9rem",
                  margin: "auto",
                }}
                color="gradient"
                shadow
                onClick={passChangeBtnHandler}>
                Change Password
              </Button>
            </Col>
          </Row>
        </Container>
      </Zoom>

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
    </>
  );
}
