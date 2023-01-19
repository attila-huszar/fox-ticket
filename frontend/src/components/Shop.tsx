import { Grid, Container, Text } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import fetchProducts from '../api/product';
import { ProductResponse } from '../interfaces/product';
import ProductCard from './ProductCard';

export default function Shop() {
  const [products, setProducts] = useState<ProductResponse[]>([]);

  useEffect(() => {
    fetchProducts().then(data => setProducts(data));
  }, []);
  return (
    <Container>
      <Text h1 css={{ textAlign: 'center' }}>
        Tickets and Passes
      </Text>
      <Grid.Container gap={2}>
        {products.map(product => (
          <ProductCard
            name={product.name}
            description={product.description}
            price={product.price}
          />
        ))}
      </Grid.Container>
    </Container>
  );
}
