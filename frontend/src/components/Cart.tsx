import React, { useContext } from 'react';
import { useEffect } from 'react';
import {
  fetchPendingOrder,
  fetchRemovePendingOrderFromCart,
} from '../api/orders';
import { CartContextInterface } from '../interfaces/orders';
import { Modal, Button, Badge } from '@nextui-org/react';
import { FiShoppingCart } from 'react-icons/fi';
import OrderCart from './OrderCart';
import { CartContext } from './App';



export default function Cart() {
  const {cart, setCart} = useContext<CartContextInterface>(CartContext);

  const [visible, setVisible] = React.useState(false);
  const closeHandler = () => {
    setVisible(false);
  };
  const handler = async () => {
    setVisible(true);
  };

  const resetAllOrdersHandler = async () => {
    fetchRemovePendingOrderFromCart();
    fetchPendingOrders();
  };

  useEffect(() => {
    fetchPendingOrders();
  }, []);

  function fetchPendingOrders() {
    return fetchPendingOrder().then(data => setCart(data));
  }

 

  return (
    <>
      <Badge color="error" content={cart.length}>
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
        <Modal.Body>
          {cart.map(order => (
            <OrderCart
              removeOrder={(orderId: number) =>
                setCart(cart.filter(order => order.id !== orderId))
              }
              key={order.id}
              name={order.name}
              price={order.price}
              id={order.id}
            />
          ))}
        </Modal.Body>

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
            onClick={resetAllOrdersHandler}
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
