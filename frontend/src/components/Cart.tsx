import React, { useContext } from 'react';
import { useEffect } from 'react';
import {
  fetchPendingOrder,
  fetchRemovePendingOrderFromCart,
  fetchChangeOrderStatusByUserId
} from '../api/orders';
import { CartContextInterface } from '../interfaces/orders';
import { Modal, Button, Badge, Text } from '@nextui-org/react';
import { FiShoppingCart } from 'react-icons/fi';
import OrderCart from './OrderCart';
import { CartContext } from './App';



export default function Cart() {
  const {cart, setCart} = useContext<CartContextInterface>(CartContext);

  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const closeHandler = () => {
    setVisible(false);
    setMessage('');
  };
  const handler = async () => {
    setVisible(true);
  };

  const resetAllOrdersHandler = async () => {
    fetchRemovePendingOrderFromCart();
    fetchPendingOrders();
    setMessage('Your cart is empty!')
  };

  const buyProductHandler= async () =>{
    fetchChangeOrderStatusByUserId()
    fetchPendingOrders();
    setVisible(false)
  }

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
          <Text>
            {message}
          </Text>
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
            onClick={buyProductHandler}
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
