import { Button, Grid, Modal, Row, Text } from '@nextui-org/react';
import { PendingOrdersResponse } from '../interfaces/product';

export default function OrderCart({ name, price }: PendingOrdersResponse) {
  return (
    
      <Row justify="space-between">
        <Text>{name}</Text>
        <Text>{price} Ft</Text>
        <Button  size="sm" auto flat color="warning">
          Remove
        </Button>
      </Row>
    
  );
}