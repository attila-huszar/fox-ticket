import { Grid, Button, Container, Card, Row, Text } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import fetchProducts from '../../api/products';
import Product from './../../interfaces/product';
import './shop.css';
// <---- HA HELYBEN AXIOSSAL FETCH VAN, AKKOR KELL: import axios from 'axios';

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);

  // <--------- MŰKŐDŐ FETCH AXIOS-SAL PRODUCT.TS-BŐL ------>

  useEffect(() => {
    fetchProducts().then(data => setProducts(data));
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

  return (
    <Container id="cardContainer">
      <Text h1 css={{ marginTop: '20px', textAlign: 'center' }}>
        Tickets and Passes
      </Text>
      <Button.Group
        color="gradient"
        ghost
        css={{ width: '100%', justifyContent: 'center' }}
      >
        <Button shadow size="md" auto color="gradient" id="ticketsTabButton">
          Tickets
        </Button>
        <Button shadow size="md" auto color="gradient" id="passesTabButton">
          Passes
        </Button>
      </Button.Group>
      <Grid.Container
        id="shopCards"
        gap={2}
        css={{
          // display: 'flex',
          margin: '0 auto',
          display: "grid",
          gridTemplateColumns: "30% 30% 30%",
          gridTemplateRows: 'repeat(autofill, minmax(300px, 1fr))',
          columnGap: "5%",
          width: "80%",
        }}
      >
        {products.map(product => (
          <Grid
            sm={12}
            md={5}
            id="cardGrid"
            css={{ justifyContent: 'flex-start', marginLeft: '10%' }}
          >
            <Card
              css={{
                w: '280px',
                display: 'flex',
                margin: '0 auto',
              }}
              id="card"
              isHoverable
              isPressable
            >
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
          </Grid>
        ))}
      </Grid.Container>
    </Container>
  );
}
