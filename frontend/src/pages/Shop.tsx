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
    <main className="flex flex-col items-center pb-52 pt-6">
      <p className="mb-4 text-2xl font-bold">Tickets and Passes</p>
      <ButtonGroup variant="ghost">
        <Button
          variant={ticketType === '' ? 'solid' : undefined}
          onPress={() => setTicketType('')}>
          All
        </Button>
        <Button
          variant={ticketType === 'ticket' ? 'solid' : undefined}
          onPress={() => setTicketType('ticket')}>
          Tickets
        </Button>
        <Button
          variant={ticketType === 'pass' ? 'solid' : undefined}
          onPress={() => setTicketType('pass')}>
          Passes
        </Button>
      </ButtonGroup>

      <div className="flex flex-wrap justify-center gap-10 py-6">
        {filteredTickets &&
          filteredTickets.map((ticket) => (
            <ProductCard
              key={ticket.id}
              id={ticket.id}
              name={ticket.name}
              type={ticket.type}
              description={ticket.description}
              duration={ticket.duration}
              price={ticket.price}
            />
          ))}
      </div>
    </main>
  )
}
