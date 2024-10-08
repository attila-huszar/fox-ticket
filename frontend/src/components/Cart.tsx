import { useContext } from 'react'
import { CartContext } from '@context/CartProvider'
import {
  fetchPendingOrder,
  fetchRemovePendingOrderFromCart,
  fetchChangeOrderStatusByUserId,
} from '@api/userOrder'
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
  const { cart, setCart } = useContext(CartContext)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  async function fetchPendingOrders() {
    const data = await fetchPendingOrder()
    setCart(data)
  }

  const resetAllOrdersHandler = async () => {
    await fetchRemovePendingOrderFromCart()
    await fetchPendingOrders()
  }

  const buyProductHandler = async () => {
    await fetchChangeOrderStatusByUserId()
    await fetchPendingOrders()
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
                {cart ? (
                  cart.map((order) => (
                    <OrderCart
                      removeOrder={(orderId: number) =>
                        setCart(cart.filter((order) => order.id !== orderId))
                      }
                      key={order.id}
                      id={order.id}
                      name={order.name}
                      price={order.price}
                      type={order.type}
                      duration={order.duration}
                      description={order.description}
                    />
                  ))
                ) : (
                  <p className="text-center">Your cart is empty</p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  size="sm"
                  onPress={() => {
                    void buyProductHandler()
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
