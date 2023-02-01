export interface PendingOrdersResponse {
  id: number;
  name: string;
  price: number;
}

export interface NewOrderRequest {
  orderDate: Date;
  expirationDate: string;
  productId: number;
  userId: number;
}

export interface CartContextInterface {
  cart: PendingOrdersResponse[]
  setCart: (pendingOrders: PendingOrdersResponse[])=> void
}