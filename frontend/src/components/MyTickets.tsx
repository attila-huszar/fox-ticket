import { useEffect, useState } from 'react';
import { fetchActiveOrders } from '../api/orders';
import { ProductResponse } from '../interfaces/product';
import ActiveTickets from './ActiveTickets';
import { Button, ButtonGroup } from '@nextui-org/react';
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
      <div>
        <h1 style={{ marginTop: '20px', textAlign: 'center', width: '100%' }}>
          My Tickets
        </h1>
        <ButtonGroup
          style={{
            width: '100%',
            justifyContent: 'center',
            marginBottom: '40px',
          }}>
          <Button
            size="md"
            id="passesTabButton"
            className="shopTabButton"
            autoFocus
            style={{ width: '100px', zIndex: '0' }}>
            Not active
          </Button>
          <Button
            className="shopTabButton"
            size="md"
            id="ticketsTabButton"
            style={{ width: '100px', zIndex: '0' }}>
            Active
          </Button>
          <Button
            className="shopTabButton"
            size="md"
            id="ticketsTabButton"
            style={{ width: '100px', zIndex: '0' }}>
            Expired
          </Button>
        </ButtonGroup>
        <div
          id="shopCards"
          style={{
            display: 'grid',
            gridTemplateColumns: '20% 20% 20%',
            gridTemplateRows: '1fr 1fr 1fr',
            gap: '5%',
            justifyContent: 'center',
          }}>
          {actives.map(active => (
            <ActiveTickets
              key={active.id}
              name={active.name}
              description={active.description}
            />
          ))}
        </div>
      </div>
    </>
  );
}
