export interface ICartContext {
  cart: PendingOrder[]
  setCart: (pendingOrders: PendingOrder[]) => void
}

export interface PendingOrder {
  id: number
  name: string
  price: number
  description?: string
  removeOrder?: (orderId: number) => void
}

export interface NewOrder {
  userId: number
  productId: number
  orderDate: Date
  expirationDate: string
  description?: string
}
