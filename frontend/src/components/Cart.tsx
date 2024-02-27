import { useContext, useState } from 'react'
import { CartContext } from '../App'
import { CartContextInterface } from '@interfaces/orders'
import {
  fetchPendingOrder,
  fetchRemovePendingOrderFromCart,
  fetchChangeOrderStatusByUserId,
} from '@api/orders'
import { OrderCart } from './OrderCart'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Badge,
  useDisclosure,
} from '@nextui-org/react'
import { FiShoppingCart } from 'react-icons/fi'

export function Cart() {
  const { cart, setCart } = useContext<CartContextInterface>(CartContext)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [message, setMessage] = useState('')

  const resetAllOrdersHandler = async () => {
    fetchRemovePendingOrderFromCart()
    fetchPendingOrders()
    setMessage('Your cart is empty!')
  }

  const buyProductHandler = async () => {
    fetchChangeOrderStatusByUserId()
    fetchPendingOrders()
  }

  async function fetchPendingOrders() {
    const data = await fetchPendingOrder()
    return setCart!(data)
  }

  return (
    <>
      {cart.length ? (
        <Badge color="danger" content={cart.length}>
          <Button
            isIconOnly
            variant="shadow"
            onPress={onOpen}
            aria-label="Cart">
            <FiShoppingCart fill="currentColor" size={18} />
          </Button>
        </Badge>
      ) : (
        <Button isIconOnly variant="shadow" onPress={onOpen} aria-label="Cart">
          <FiShoppingCart fill="currentColor" size={18} />
        </Button>
      )}

      <Modal
        closeButton
        aria-labelledby="shopping cart"
        isOpen={isOpen}
        onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Shopping Cart
              </ModalHeader>
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
                  size="sm"
                  onPress={() => {
                    buyProductHandler()
                    onClose()
                  }}>
                  Buy
                </Button>
                <Button
                  size="sm"
                  color="warning"
                  variant="flat"
                  onPress={resetAllOrdersHandler}>
                  Reset
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
