import { Button, Row, Text } from '@nextui-org/react';
import { PendingOrdersResponse } from '../interfaces/orders';
import { fetchRemoveProductFromCart } from '../api/orders';

interface PropTypes extends PendingOrdersResponse {
  removeOrder: (orderId: number)=>void
}

export default function OrderCart({ name, price, id, removeOrder }: PropTypes) {
  const removeOrderHandler = async () => {
    await fetchRemoveProductFromCart(id);
    removeOrder(id);
  };

  return (
    <Row justify="space-between">
      <Text>{name}</Text>
      <Text>{price} Ft</Text>
      <Button size="sm" auto flat color="warning" onClick={removeOrderHandler}>
        Remove
      </Button>
    </Row>
  );
}
