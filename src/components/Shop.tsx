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

  // <--------- MŰKŐDŐ FETCH AXIOS-SAL PRODUCT.TS-BŐL ------>

  useEffect(() => {
    fetchProducts().then(data => {
      setProducts(data);
      setFilteredProducts(data);
    });
  }, []);

  // <--------- MŰKŐDŐ FETCH AXIOS-SAL HELYBEN ------>

  // useEffect(() =>{
  //   async function fetchData(){
  //     const request = await axios.get(`/api/products`);
  //     console.log(request)
  //     setProducts(request.data.allProducts)
  //     return request;
  //   }
  //   fetchData();
  // }, [`/api/products`])

  // <--------- MŰKŐDŐ FETCH AXIOS NÉLKÜL ------>
  // useEffect(() => {
  //   fetchProducts().then(productsData => {
  //     setProducts(productsData.allProducts);
  //   });
  // }, []);

  async function handleTicketsClick() {
    const allTickets: ProductResponse[] = [];
    products.forEach(ticket => {
      if (ticket.type === 'ticket') {
        allTickets.push(ticket);
      }
      setFilteredProducts(allTickets);
    });
  }

  async function handlePassesClick() {
    const allPasses: ProductResponse[] = [];
    products.forEach(pass => {
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
    <Container>
      <Text h1 css={{ marginTop: '20px', textAlign: 'center', width: '100%' }}>
        Tickets and Passes
      </Text>
      <Button.Group
        color="gradient"
        ghost
        css={{ width: '100%', justifyContent: 'center', marginBottom: '40px' }}
      >
        <Button
          className="shopTabButton"
          shadow
          size="md"
          color="gradient"
          css={{ outline: 'none', width: '100px', zIndex: '0' }}
          id="showAllButton"
          autoFocus
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
          gridTemplateRows: 'repeat(autofill, minmax(300px, 1fr))',
          gap: '40px',
          justifyContent: 'center',
        }}
      >
        {filteredProducts.map(product => (
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