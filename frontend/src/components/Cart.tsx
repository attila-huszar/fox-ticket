import React, { useContext } from 'react';
import {
  fetchPendingOrder,
  fetchRemovePendingOrderFromCart,
  fetchChangeOrderStatusByUserId,
} from '../api/orders';
import { CartContextInterface } from '../interfaces/orders';
import { Modal, Button, Badge, Text } from '@nextui-org/react';
import { FiShoppingCart } from 'react-icons/fi';
import OrderCart from './OrderCart';
import { CartContext } from './App';

export default function Cart() {
  const { cart, setCart } = useContext<CartContextInterface>(CartContext);

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
    setMessage('Your cart is empty!');
  };

  const buyProductHandler = async () => {
    fetchChangeOrderStatusByUserId();
    fetchPendingOrders();
    setVisible(false);
  };

  function fetchPendingOrders() {
    return fetchPendingOrder().then(data => setCart(data));
  }

  return (
    <>
      {cart.length !== 0 ? (
        <Badge color="error" content={cart.length}>
          <Button
            css={{
              fontSize: '1rem',
              '&:hover, &:focus': {
                boxShadow: '0 4px 14px 0 var(--nextui-colors-hoverShadow)',
              },
            }}
            auto
            color="secondary"
            shadow
            rounded
            icon={<FiShoppingCart />}
            onClick={handler}
          ></Button>
        </Badge>
      ) : (
        <Button
          css={{
            fontSize: '1rem',
            '&:hover, &:focus': {
              boxShadow: '0 4px 14px 0 var(--nextui-colors-hoverShadow)',
            },
          }}
          auto
          color="secondary"
          shadow
          rounded
          icon={<FiShoppingCart />}
          onClick={handler}
        ></Button>
      )}
     
      <Modal
        closeButton
        blur
        aria-labelledby="shopping cart"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Body>
          <Text>{message}</Text>
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
