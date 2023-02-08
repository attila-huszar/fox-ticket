import { NewOrderRequest } from '../interfaces/order';
import Order from '../models/Order';
import Product from '../models/Product';

export function getAllOrders(userId: number): Promise<Order[]> {
  return Order.findAll({
    where: {
      userId: userId,
    },
  });
}

export function createOrder(newOrder: NewOrderRequest): Promise<Order> {
  console.log(newOrder);

  return Order.create({ ...newOrder });
}

export function getAllPendingOrders(userId: number): Promise<Order[]> {
  return Order.findAll({
    where: { userId: userId, status: 'pending' },
    include: Product,
  });
}

export function changeOrderStatusByUserId(userId: number): Promise<number[]> {
  return Order.update(
    { status: 'paid' },
    { where: { userId: userId, status: 'pending' } }
  );
}

export function getActiveOrders(userId: number): Promise<Order[]> {
  return Order.findAll({
    where: { userId: userId, status: 'paid' },
    include: Product,
  });
}