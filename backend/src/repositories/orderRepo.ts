import { NewOrderRequest } from '../interfaces/order';
import Order from '../models/Order';

export function getPendingOrders(userId: number): Promise<Order[]> {
  return Order.findAll({
    where: {
      userId: userId,
      status: 'pending',
    },
  });
}

export function getAllOrders(userId: number): Promise<Order[]> {
  return Order.findAll({
    where: {
      userId: userId,
    },
  });
}

export function createOrder(newOrder: NewOrderRequest): Promise<Order> {
  return Order.create({ ...newOrder });
}
