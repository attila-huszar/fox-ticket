import { useEffect, useState } from 'react'
import { Button, ButtonGroup } from '@nextui-org/react'
import { fetchProducts } from '@api/products'
import { ProductCard } from '@components/ProductCard'
import { ProductResponse } from '@interfaces/product'

export function Shop() {
  const [tickets, setTickets] = useState<ProductResponse[]>([])
  const [ticketType, setTicketType] = useState('')

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setTickets(data)
      })
      .catch((err) => {
        console.error(err.message)
      })
  }, [])

  const filteredTickets = ticketType
    ? tickets.filter((ticket) => ticket.type === ticketType)
    : tickets

  return (
    <main className="flex flex-col items-center">
      <div className="my-10 flex flex-col items-center">
        <p className="text-2xl font-bold">Tickets and Passes</p>
        <ButtonGroup>
          <Button color="primary" onPress={() => setTicketType('')}>
            All
          </Button>
          <Button color="primary" onPress={() => setTicketType('ticket')}>
            Tickets
          </Button>
          <Button color="primary" onPress={() => setTicketType('pass')}>
            Passes
          </Button>
        </ButtonGroup>
      </div>

      <div className="flex flex-wrap justify-center gap-10 p-4">
        {filteredTickets &&
          filteredTickets.map((ticket) => (
            <ProductCard
              key={ticket.id}
              name={ticket.name}
              description={ticket.description}
              price={ticket.price}
            />
          ))}
      </div>
    </main>
  )
}
