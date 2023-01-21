import React from 'react';
import {useState, useEffect } from 'react';
import fetchPendingOrder from '../api/products';
import { PendingOrdersResponse } from '../interfaces/product';
import { Modal, Button, Badge } from '@nextui-org/react';
import { FiShoppingCart } from 'react-icons/fi';
import OrderCart from './OrderCart';
export default function Cart() {
  const [visible, setVisible] = React.useState(false);
  const [orders, setOrders] = useState<PendingOrdersResponse[]>([]);

  const closeHandler = () => {
    setVisible(false);
  };
  const handler = async () => {
    setVisible(true); }

  useEffect(() => {
    fetchPendingOrder().then(data => setOrders(data));
  }, []);
  

  return (
    <>
      <Badge color="error" content={orders.length}>
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
          {orders.map(order => (
            <OrderCart name={order.name} price={order.price} />
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
