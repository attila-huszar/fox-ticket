import { useState, useEffect } from 'react';
import { Text, Container, Grid } from '@nextui-org/react';
import { fetchProducts } from '../api/products';
import { ProductResponse } from '../interfaces/product';
import ProductCard from './ProductCard';
import { AddProduct } from './AddProduct';

export default function AdminProduct() {
  const [products, setProducts] = useState<ProductResponse[]>([]);

  const addProduct = (newProduct: ProductResponse) => {
    setProducts([...products, newProduct]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchProducts();
      setProducts(response);
    };
    fetchData();
  }, []);

  return (
    <Container style={{ marginBottom: '10%' }}>
      <Text h1 css={{ textAlign: 'center', zIndex: '0' }}>
        Tickets and Passes
      </Text>
      <AddProduct addProduct={addProduct} />
      <Grid.Container
        gap={2}
        id="shopCards"
        css={{
          display: 'grid',
          gridTemplateColumns: '20% 20% 20%',
          gridTemplateRows: '1fr 1fr 1fr',
          gap: '5%',
          justifyContent: 'center',
        }}
      >
        {products.map(product => (
          <ProductCard
            removeProduct={(productId: number) =>
              setProducts(products.filter(product => product.id !== productId))
            }
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            duration={product.duration}
            description={product.description}
            type={product.type}
            isAdmin={true}
          />
        ))}
      </Grid.Container>
    </Container>
  );
}
