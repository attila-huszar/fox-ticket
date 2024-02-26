import { Button } from '@nextui-org/react'
import { PendingOrdersResponse } from '@interfaces/orders'
import { fetchRemoveProductFromCart } from '@api/orders'

interface PropTypes extends PendingOrdersResponse {
  removeOrder: (orderId: number) => void
}

export function OrderCart({ name, price, id, removeOrder }: PropTypes) {
  const removeOrderHandler = async () => {
    await fetchRemoveProductFromCart(id)
    removeOrder(id)
  }

  return (
    <div className="justify-between">
      <p>{name}</p>
      <p>{price} Ft</p>
      <Button color="warning" onClick={removeOrderHandler}>
        Remove
      </Button>
    </div>
  )
}
