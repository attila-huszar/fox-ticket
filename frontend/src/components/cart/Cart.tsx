import React from "react";
import shopIcon from "./shopicon.png";

import {
  Modal,
  Text,
  Button,
  Row,
  Image
} from "@nextui-org/react";

export default function Cart() {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  return (
    <>
      <Button auto color="secondary" shadow onClick={handler}>
      <Image
      src={shopIcon}
      alt="Cart"
      css={{width: "20px", height: "15px", margin: "0"}}
    /> Cart
      </Button>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            My Cart
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Row justify="space-between">
            <Text>One day ticket</Text>
            <Text>1</Text>
            <Button
              auto
              flat
              color="secondary"
              css={{ marginTop: "8px", marginBottom: "16px" }}
            >
              Remove
            </Button>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="secondary">
            Buy
          </Button>
          <Button auto flat color="secondary">
            Reset
          </Button>
          <Button auto flat color="secondary" onPress={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
