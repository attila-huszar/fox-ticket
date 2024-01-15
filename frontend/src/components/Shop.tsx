import { Button, ButtonGroup } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { fetchProducts } from '../api/products'
import { ProductResponse } from '../interfaces/product'
import ProductCard from './ProductCard'
import '../styles/Shop.css'

export default function Shop() {
  const [products, setProducts] = useState<ProductResponse[]>([])
  const [filteredProducts, setFilteredProducts] = useState<ProductResponse[]>(
    [],
  )

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data)
        setFilteredProducts(data)
        return null
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  async function handleTicketsClick() {
    const allTickets: ProductResponse[] = []
    products.map((ticket) => {
      if (ticket.type === 'ticket') {
        allTickets.push(ticket)
      }
      setFilteredProducts(allTickets)
    })
  }

  async function handlePassesClick() {
    const allPasses: ProductResponse[] = []
    products.map((pass) => {
      if (pass.type === 'pass') {
        allPasses.push(pass)
      }
      setFilteredProducts(allPasses)
    })
  }

  async function handleAllClick() {
    setFilteredProducts(products)
  }

  return (
    <div
      style={{
        display: 'grid',
      }}>
      <p style={{ marginTop: '20px', textAlign: 'center', width: '100%' }}>
        Tickets and Passes
      </p>
      <ButtonGroup
        style={{
          width: '100%',
          justifyContent: 'center',
          marginBottom: '40px',
        }}>
        <Button
          autoFocus
          className="shopTabButton"
          size="md"
          style={{ width: '100px', zIndex: '0' }}
          id="showAllButton"
          onPress={handleAllClick}>
          All
        </Button>
        <Button
          className="shopTabButton"
          size="md"
          id="ticketsTabButton"
          style={{ width: '100px', zIndex: '0' }}
          onPress={handleTicketsClick}>
          Tickets
        </Button>
        <Button
          size="md"
          id="passesTabButton"
          className="shopTabButton"
          style={{ width: '100px', zIndex: '0' }}
          onPress={handlePassesClick}>
          Passes
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
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>
    </div>
  )
}
