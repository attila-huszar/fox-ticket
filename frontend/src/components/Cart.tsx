import { useContext, useState } from 'react'
import { CartContext } from '../App'
import { CartContextInterface } from '@interfaces/orders'
import {
  fetchPendingOrder,
  fetchRemovePendingOrderFromCart,
  fetchChangeOrderStatusByUserId,
} from '@api/orders'
import { OrderCart } from './OrderCart'
import { Modal, Button, Badge, ModalBody, ModalFooter } from '@nextui-org/react'
import { FiShoppingCart } from 'react-icons/fi'

export function Cart() {
  const { cart, setCart } = useContext<CartContextInterface>(CartContext)

  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState('')

  const closeHandler = () => {
    setVisible(false)
    setMessage('')
  }
  const handler = async () => {
    setVisible(true)
  }

  const resetAllOrdersHandler = async () => {
    fetchRemovePendingOrderFromCart()
    fetchPendingOrders()
    setMessage('Your cart is empty!')
  }

  const buyProductHandler = async () => {
    fetchChangeOrderStatusByUserId()
    fetchPendingOrders()
    setVisible(false)
  }

  async function fetchPendingOrders() {
    const data = await fetchPendingOrder()
    return setCart!(data)
  }

  return (
    <>
      {cart.length ? (
        <Badge color="danger" content={cart.length}>
          <Button isIconOnly variant="shadow" onClick={handler}>
            <FiShoppingCart size={30} />
          </Button>
        </Badge>
      ) : (
        <Button isIconOnly variant="shadow" onClick={handler}>
          <FiShoppingCart size={30} />
        </Button>
      )}

      <Modal closeButton aria-labelledby="shopping cart" onClose={closeHandler}>
        <ModalBody>
          <p>{message}</p>
          {cart.map((order) => (
            <OrderCart
              removeOrder={(orderId: number) =>
                setCart!(cart.filter((order) => order.id !== orderId))
              }
              key={order.id}
              name={order.name}
              price={order.price}
              id={order.id}
            />
          ))}
        </ModalBody>

        <ModalFooter>
          <Button size="sm" color="secondary" onClick={buyProductHandler}>
            Buy
          </Button>
          <Button size="sm" id="submit" onClick={resetAllOrdersHandler}>
            Reset
          </Button>
          <Button size="sm" color="primary" id="submit" onPress={closeHandler}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}
