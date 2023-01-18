import { useState, useEffect } from 'react';
import { Text, Container, Grid } from '@nextui-org/react';
import fetchProducts from '../../api/product';
import { ProductResponse } from '../../interfaces/product';
import ProductCard from '../ProductCard';

export default function AdminProduct() {
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
            price={product.price}
            description={product.description}
            isAdmin={true}
          />
        ))}
      </Grid.Container>
    </Container>
  );
}
