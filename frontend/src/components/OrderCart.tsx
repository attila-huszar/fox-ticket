import { Button } from '@nextui-org/react'
import { PendingOrder } from '@interfaces/orders'
import { fetchRemoveProductFromCart } from '@api/orders'

export function OrderCart({ name, price, id, removeOrder }: PendingOrder) {
  const removeOrderHandler = async () => {
    await fetchRemoveProductFromCart(id)
    removeOrder!(id)
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
