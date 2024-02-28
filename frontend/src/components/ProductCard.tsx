import { useContext } from 'react'
import { CartContext } from '@context/CartProvider'
import { ICartContext } from '@interfaces/orders'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Divider,
  Spacer,
} from '@nextui-org/react'
import { EditProduct } from './EditProduct'
import { fetchCreateNewPendingOrder, fetchPendingOrder } from '@api/userOrder'
import { fetchDeleteProduct } from '@api/products'
import { ProductRequest } from '@interfaces/product'

export function ProductCard({
  id,
  name,
  description,
  price,
  duration,
  isAdmin,
  type,
  removeProduct,
}: ProductRequest) {
  const { setCart } = useContext<ICartContext>(CartContext)
  const deleteProductHandler = async () => {
    await fetchDeleteProduct(id)
    removeProduct?.(id)
  }

  const createNewOrderHandler = async () => {
    await fetchCreateNewPendingOrder(new Date(), Number(id), 1)
    const pendingOrders = await fetchPendingOrder()
    setCart(pendingOrders)
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
