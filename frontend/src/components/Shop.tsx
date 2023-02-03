import { Grid, Container, Text, Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/products';
import { ProductResponse } from '../interfaces/product';
import ProductCard from './ProductCard';
import '../styles/Shop.css';

export default function Shop() {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductResponse[]>(
    []
  );

  useEffect(() => {
    fetchProducts().then(data => {
      setProducts(data);
      setFilteredProducts(data);
    });
  }, []);

  async function handleTicketsClick() {
    const allTickets: ProductResponse[] = [];
    products.map(ticket => {
      if (ticket.type === 'ticket') {
        allTickets.push(ticket);
      }
      setFilteredProducts(allTickets);
    });
  }

  async function handlePassesClick() {
    const allPasses: ProductResponse[] = [];
    products.map(pass => {
      if (pass.type === 'pass') {
        allPasses.push(pass);
      }
      setFilteredProducts(allPasses);
    });
  }

  async function handleAllClick() {
    setFilteredProducts(products);
  }

  return (
    <Container
      style={{
        display: 'grid',
      }}
    >
      <Text h1 css={{ marginTop: '20px', textAlign: 'center', width: '100%' }}>
        Tickets and Passes
      </Text>
      <Button.Group
        color="gradient"
        ghost
        css={{ width: '100%', justifyContent: 'center', marginBottom: '40px' }}
      >
        <Button
          autoFocus
          className="shopTabButton"
          shadow
          size="md"
          color="gradient"
          css={{ width: '100px', zIndex: '0' }}
          id="showAllButton"
          onPress={handleAllClick}
        >
          All
        </Button>
        <Button
          className="shopTabButton"
          shadow
          size="md"
          color="gradient"
          id="ticketsTabButton"
          css={{ width: '100px', zIndex: '0' }}
          onPress={handleTicketsClick}
        >
          Tickets
        </Button>
        <Button
          shadow
          size="md"
          color="gradient"
          id="passesTabButton"
          className="shopTabButton"
          css={{ width: '100px', zIndex: '0' }}
          onPress={handlePassesClick}
        >
          Passes
        </Button>
      </Button.Group>
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
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
          />
        ))}
      </Grid.Container>
    </Container>
  );
}
