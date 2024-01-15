import { useContext, useState } from 'react'
import {
  fetchPendingOrder,
  fetchRemovePendingOrderFromCart,
  fetchChangeOrderStatusByUserId,
} from '../api/orders'
import { CartContextInterface } from '../interfaces/orders'
import { Modal, Button, Badge, ModalBody, ModalFooter } from '@nextui-org/react'
import { FiShoppingCart } from 'react-icons/fi'
import OrderCart from './OrderCart'
import { CartContext } from './App'

export default function Cart() {
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

  function fetchPendingOrders() {
    return fetchPendingOrder().then((data) => setCart!(data))
  }

  return (
    <>
      {cart.length !== 0 ? (
        <Badge color="danger" content={cart.length}>
          <Button
            style={{
              fontSize: '1rem',
              '&:hover, &:focus': {
                boxShadow: '0 4px 14px 0 var(--nextui-colors-hoverShadow)',
              },
            }}
            auto
            color="secondary"
            shadow
            rounded
            icon={<FiShoppingCart />}
            onClick={handler}></Button>
        </Badge>
      ) : (
        <Button
          style={{
            fontSize: '1rem',
            '&:hover, &:focus': {
              boxShadow: '0 4px 14px 0 var(--nextui-colors-hoverShadow)',
            },
          }}
          auto
          color="secondary"
          shadow
          rounded
          icon={<FiShoppingCart />}
          onClick={handler}></Button>
      )}

      <Modal
        closeButton
        aria-labelledby="shopping cart"
        open={visible}
        onClose={closeHandler}>
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
          <Button
            style={{ marginRight: '20px' }}
            size="sm"
            color="secondary"
            onClick={buyProductHandler}>
            Buy
          </Button>
          <Button
            style={{ marginRight: '20px' }}
            size="sm"
            id="submit"
            onClick={resetAllOrdersHandler}>
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
