import { useContext } from 'react'
import { CartContext } from '../App'
import { CartContextInterface } from '@interfaces/orders'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Divider,
  Spacer,
} from '@nextui-org/react'
import { ProductRequest } from '@interfaces/product'
import { EditProduct } from './EditProduct'
import { fetchDeleteProduct } from '@api/products'
import { fetchCreateNewPendingOrder, fetchPendingOrder } from '@api/orders'

interface PropTypes extends ProductRequest {
  removeProduct?: (productId: number) => void
}

export function ProductCard({
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

  const createNewOrderHandler = async () => {
    await fetchCreateNewPendingOrder(new Date(), Number(id), 1)
    const pendingOrders = await fetchPendingOrder()
    setCart!(pendingOrders)
  }

  return (
    <Card key={id} isHoverable className="w-64 gap-5">
      <CardHeader className="flex gap-3">
        <p>{name}</p>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{price} Ft</p>
        <p>{description}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <div>
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
              <Button onPress={deleteProductHandler}>Remove</Button>
            </>
          ) : (
            <Button onPress={createNewOrderHandler}>Add to Cart</Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
