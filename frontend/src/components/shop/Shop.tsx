import { Grid, Button, Container, Card, Row, Text } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import fetchProducts from '../../api/products';
import Product from './../../interfaces/product';
import './shop.css';
// <---- HA HELYBEN AXIOSSAL FETCH VAN, AKKOR KELL: import axios from 'axios';

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

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
    const allTickets: Product[] = [];
    products.map(ticket => {
      if (ticket.type === 'ticket') {
        allTickets.push(ticket);
      }
      setFilteredProducts(allTickets);
    });
  }

  async function handlePassesClick() {
    const allPasses: Product[] = [];
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
    <Container id="cardContainer">
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
          css={{ button: focus, outline: 'none', width: '100px' }}
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
          css={{ width: '100px' }}
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
          css={{ width: '100px' }}
          onPress={handlePassesClick}
        >
          Passes
        </Button>
      </Button.Group>
      <Grid.Container
        id="shopCards"
        gap={2}
        css={{
          display: 'grid',
          gridTemplateColumns: '20% 20% 20%',
          gridTemplateRows: 'repeat(autofill, minmax(300px, 1fr))',
          rowGap: '40px',
          justifyContent: 'center',
        }}
      >
        {filteredProducts.map(product => (
          <Grid
            sm={12}
            md={5}
            id="cardGrid"
            css={{
              justifyContent: 'center',
              marginLeft: '32%',
              width: '100%',
              padding: '0',
            }}
          >
            <Card
              css={{
                w: '280px',
                display: 'flex',
                margin: '0 auto',
              }}
              id="card"
              isHoverable
            >
              <Card.Header>
                <Text css={{ margin: 'auto' }}>{product.name}</Text>
              </Card.Header>
              <Card.Divider />
              <Card.Body css={{ py: '$10' }}>
                <Text css={{ margin: 'auto' }}>{product.price} Ft</Text>
                <Text css={{ margin: 'auto' }}>{product.description}</Text>
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
          </Grid>
        ))}
      </Grid.Container>
    </Container>
  );
}
