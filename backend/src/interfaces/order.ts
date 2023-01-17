import Order from '../models/Order';

export interface GetAllOrdersResponse {
  allOrders: Order[];
}

export interface PurchasedOrdersResponse {
  purchases: Order[];
}

export interface NewOrderRequest {
  orderDate: string;
  status: string;
  paidDate: string;
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
