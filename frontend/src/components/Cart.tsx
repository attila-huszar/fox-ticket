import React from 'react';
import { Modal, Text, Button, Row, Badge } from '@nextui-org/react';
import { FiShoppingCart } from 'react-icons/fi';

export default function Cart() {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <>
      <Badge color="error" content={2}>
        <Button
          auto
          color="secondary"
          shadow
          rounded
          icon={<FiShoppingCart />}
          onClick={handler}
        ></Button>
      </Badge>

      <Modal
        closeButton
        blur
        aria-labelledby="shopping cart"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <Row justify="space-between">
            <Text>One day ticket</Text>
            <Text>1</Text>
            <Button
              auto
              flat
              color="secondary"
              css={{ marginTop: '8px', marginBottom: '16px' }}
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
