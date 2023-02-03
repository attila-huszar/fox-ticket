import { useEffect, useState } from 'react';
import { fetchActiveOrders } from '../api/orders';
import { ProductResponse } from '../interfaces/product';
import ActiveTickets from './ActiveTickets';
import { Grid, Button, Container } from '@nextui-org/react';
import '../styles/Shop.css';

export default function MyTickets() {
  const [actives, setActive] = useState<ProductResponse[]>([]);

  useEffect(() => {
    fetchActiveOrders().then(data => {
      setActive(data);
    });
  }, []);

  return (
    <>
      <Container>
        <h1 style={{ marginTop: '20px', textAlign: 'center', width: '100%' }}>
          My Tickets
        </h1>
        <Button.Group
          color="gradient"
          ghost
          css={{
            width: '100%',
            justifyContent: 'center',
            marginBottom: '40px',
          }}
        >
          <Button
            shadow
            size="md"
            color="gradient"
            id="passesTabButton"
            className="shopTabButton"
            autoFocus
            css={{ width: '100px', zIndex: '0' }}
          >
            Not active
          </Button>
          <Button
            className="shopTabButton"
            shadow
            size="md"
            color="gradient"
            id="ticketsTabButton"
            css={{ width: '100px', zIndex: '0' }}
          >
            Active
          </Button>
          <Button
            className="shopTabButton"
            shadow
            size="md"
            color="gradient"
            id="ticketsTabButton"
            css={{ width: '100px', zIndex: '0' }}
          >
            Expired
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
          {actives.map(active => (
            <ActiveTickets
              key={active.id}
              name={active.name}
              description={active.description}
            />
          ))}
        </Grid.Container>
      </Container>
    </>
  );
}
