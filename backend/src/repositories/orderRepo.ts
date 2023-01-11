const { Op } = require('sequelize');
import { NewOrderRequest } from '../interfaces/order';
import Order from '../models/Order';

export function getAllOrders(userId: number): Promise<Order[] | null> {
  return Order.findAll({
    where: {
      [Op.and]: [{ userId: userId }, { status: 'not active' }],
    },
  });
}

export function createOrder(newOrder: NewOrderRequest): Promise<Order> {
  return Order.create({ ...newOrder });
}
