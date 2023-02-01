import { useEffect, useState } from 'react';
import { fetchActiveOrders } from '../api/orders';
import { ProductResponse } from '../interfaces/product';
import ActiveTickets from './ActiveTickets';

export default function MyTickets() {
  const [actives, setActive] = useState<ProductResponse[]>([]);

  useEffect(() => {
    fetchActiveOrders().then(data => {
      setActive(data);
    });
  }, []);

  return (
    <>
    {actives.map(active => (
      <ActiveTickets name={active.name} description={active.description} />
    ))}
    </>
  );
}
