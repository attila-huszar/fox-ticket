import { createContext, useState } from 'react'
import { ICartContext, PendingOrder } from '@interfaces/orders'

export const CartContext = createContext<ICartContext>({
  cart: [],
  setCart: () => undefined,
})

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<PendingOrder[]>([])

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  )
}
