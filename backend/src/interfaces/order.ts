import Order from '../models/Order';

export interface GetAllOrdersResponse {
  allOrders: Order[];
}

export interface PurchasedOrdersResponse {
  purchases: Order[];
}

export interface NewOrderRequest {
  orderDate: Date;
  expirationDate: string;
  productId: number;
  userId: number;
}
export interface OrderResponse {
  id: number;
  orderDate: string;
  status: string;
  paidDate: string;
  expirationDate: string;
  productId: number;
}

export interface UpdateOrderStatusRequest {
  orderByUser: Order[];
}

export interface UpdateOrderStatusResponse {
  purchases: UpdatedOrder[];
}

export interface UpdatedOrder {
  id: number;
  status: string;
  paidDate: string;
  expirationDate: string;
  productName: string;
}

export interface PendingOrderWithProductDetail {
  id: number;
  status: string;
  orderDate: string;
  name: string;
  price: number;
  description: string;
}

export interface PendingOrdersResponse {
  orders: PendingOrderWithProductDetail[];
}
