export interface PendingOrdersResponse {
  id: number;
  name: string;
  price: number;
  description?: string;
}

export interface NewOrderRequest {
  orderDate: Date;
  expirationDate: string;
  productId: number;
  userId: number;
  description?: string;
}

export interface CartContextInterface {
  cart: PendingOrdersResponse[];
  setCart: (pendingOrders: PendingOrdersResponse[]) => void;
}
