import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Spacer,
} from '@nextui-org/react'
import { fetchDeleteProduct } from '../api/products'
import { fetchCreateNewPendingOrder, fetchPendingOrder } from '../api/orders'
import { ProductRequest } from '../interfaces/product'
import { EditProduct } from './EditProduct'
import { CartContextInterface } from '../interfaces/orders'
import { CartContext } from './App'
import { useContext } from 'react'

interface PropTypes extends ProductRequest {
  removeProduct?: (productId: number) => void
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  duration,
  isAdmin,
  type,
  removeProduct,
}: PropTypes) {
  const { setCart } = useContext<CartContextInterface>(CartContext)
  const deleteProductHandler = async () => {
    await fetchDeleteProduct(id as number)
    removeProduct?.(id as number)
  }

  const createNewOrderHadler = async () => {
    await fetchCreateNewPendingOrder(new Date(), Number(id), 1)
    const pendingOrders = await fetchPendingOrder()
    setCart!(pendingOrders)
  }

  return (
    <div
      id="cardGrid"
      style={{
        justifyContent: 'center',
        margin: '0 auto',
        width: '100%',
        padding: '0',
      }}>
      <Card
        key={id}
        style={{
          width: '280px',
          display: 'flex',
          margin: '0 auto',
          backgroundColor: 'var(--nextui-colors-cardBackground)',
        }}
        id="card"
        isHoverable>
        <CardHeader
          style={{
            backgroundColor: 'var(--nextui-colors-cardHeaderBackground)',
          }}>
          <p style={{ color: 'White', margin: 'auto', fontSize: 'larger' }}>
            {name}
          </p>
        </CardHeader>
        <Divider />
        <CardBody style={{ padding: '10px' }}>
          <p style={{ margin: 'auto' }}>{price} Ft</p>
          <p style={{ margin: 'auto' }}>{description}</p>
        </CardBody>
        <Divider />
        <CardFooter>
          <div className="justify-center">
            {isAdmin ? (
              <>
                <EditProduct
                  id={id}
                  name={name}
                  price={price}
                  duration={duration}
                  description={description}
                  type={type}
                />
                <Spacer />
                <Button onPress={deleteProductHandler} size="md" id="submit">
                  Remove
                </Button>
              </>
            ) : (
              <Button size="md" id="submit" onPress={createNewOrderHadler}>
                Add to Cart
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
