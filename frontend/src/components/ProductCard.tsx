import { Grid, Button, Card, Row, Text, Spacer } from '@nextui-org/react';
import { ProductRequest } from '../interfaces/product';

export default function ProductCard({
  name,
  description,
  price,
  isAdmin,
}: ProductRequest) {
  return (
    <Grid sm={12} md={5}>
      <Card css={{ mw: '350px' }}>
        <Card.Header>
          <Text css={{ margin: 'auto' }}>{name}</Text>
        </Card.Header>
        <Card.Divider />
        <Card.Body css={{ py: '$10' }}>
          <Text css={{ margin: 'auto' }}>{description}</Text>
          <Text css={{ margin: 'auto' }}>{price} Ft</Text>
        </Card.Body>
        <Card.Divider />
        <Card.Footer>
          <Row justify="center">
            {isAdmin ? (
              <>
                <Button shadow size="md" auto color="gradient" id="submit">
                  Remove
                </Button>
                <Spacer />
                <Button shadow size="md" auto color="gradient" id="submit">
                  Edit
                </Button>
              </>
            ) : (
              <Button shadow size="md" auto color="gradient" id="submit">
                Add to Cart
              </Button>
            )}
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
}
