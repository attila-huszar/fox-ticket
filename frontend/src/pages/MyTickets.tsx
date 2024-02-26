import { useEffect, useState } from 'react'
import { fetchActiveOrders } from '@api/orders'
import { ProductResponse } from '@interfaces/product'
import { ActiveTickets } from '../components/ActiveTickets'
import { Button, ButtonGroup } from '@nextui-org/react'

export function MyTickets() {
  const [tickets, setTickets] = useState<ProductResponse[]>([])

  useEffect(() => {
    fetchActiveOrders()
      .then((data) => {
        setTickets(data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return (
    <main className="flex flex-col items-center">
      <div>
        <h1>My Tickets</h1>
        <ButtonGroup>
          <Button autoFocus>Bought</Button>
          <Button>Active</Button>
          <Button>Expired</Button>
        </ButtonGroup>
        <div>
          {tickets.map((ticket) => (
            <ActiveTickets
              key={ticket.id}
              name={ticket.name}
              description={ticket.description}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
