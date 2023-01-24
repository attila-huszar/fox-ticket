import Order from '../models/Order';

export interface GetAllOrdersResponse {
  allOrders: Order[];
}

export interface PurchasedOrdersResponse {
  purchases: Order[];
}

export interface NewOrderRequest {
  orderDate: Date;
  status: string;
  paidDate: string;
  expirationDate: string;
  productId: number;
  userId: number;
}
export interface OrderResponse extends NewOrderRequest {
  id: number;
}

export interface UpdateOrderStatusRequest {
  orderByUser: Order[];
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
}
