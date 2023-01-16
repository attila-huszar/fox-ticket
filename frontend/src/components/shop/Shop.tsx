import { Grid, Button, Container, Card, Row, Text } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import fetchProducts from '../../api/products';
import Product from './../../interfaces/product';
import './Shop.css';

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts().then(productsData => {
      setProducts(productsData.allProducts);
    });
  }, []);

  return (
    <Container id="cardContainer">
      <Text h1 css={{ marginTop: '20px' }}>
        Tickets and Passes
      </Text>
      <Grid.Container
        id="shopCards"
        gap={2}
        css={{
          display: 'flex',
          flexFlow: 'wrap',
          flexDirection: 'row',
          width: '100%',
        }}
      >
        <Grid sm={12} md={5} id="cardGrid">
          {products.map(product => (
            <Card css={{ mw: '300px', margin: '20px 20px 0 20px' }} id="card">
              <Card.Header>
                <Text css={{ margin: 'auto' }}>{product.name}</Text>
              </Card.Header>
              <Card.Divider />
              <Card.Body css={{ py: '$10' }}>
                <Text css={{ margin: 'auto' }}>{product.duration} days</Text>
                <Text css={{ margin: 'auto' }}>{product.price} Ft</Text>
              </Card.Body>
              <Card.Divider />
              <Card.Footer>
                <Row justify="center">
                  <Button shadow size="md" auto color="gradient" id="submit">
                    Add to Cart
                  </Button>
                </Row>
              </Card.Footer>
            </Card>
          ))}
        </Grid>
      </Grid.Container>
    </Container>
  );
}
