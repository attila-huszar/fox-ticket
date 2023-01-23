import React from 'react';
import { Modal, Button, Badge } from '@nextui-org/react';
import { FiShoppingCart } from 'react-icons/fi';


export default function Cart() {
  const [visible, setVisible] = React.useState(false);


  const closeHandler = () => {
    setVisible(false);
  };
  const handler = async () => {
    setVisible(true); }
  

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
        <Modal.Footer>
          <Button
            css={{ marginRight: '20px' }}
            shadow
            size="sm"
            auto
            color="secondary"
          >
            Buy
          </Button>
          <Button
            css={{ marginRight: '20px' }}
            shadow
            size="sm"
            auto
            color="gradient"
            id="submit"
          >
            Reset
          </Button>
          <Button
            shadow
            size="sm"
            auto
            color="primary"
            id="submit"
            onPress={closeHandler}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
