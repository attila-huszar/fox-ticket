import { NotFoundError, ParameterError } from '../errors';
import {
  GetAllOrdersResponse,
  NewOrderRequest,
  OrderResponse,
  PurchasedOrdersResponse,
} from '../interfaces/order';
import Order from '../models/Order';
import User from '../models/User';
import * as orderRepo from '../repositories/orderRepo';
import * as userRepo from '../repositories/userRepo';
import _ from 'lodash';

const orderResponse = (order: object) => {
  return _.pick(order, [
    'id',
    'orderDate',
    'status',
    'paidDate',
    'expirationDate',
    'productId',
  ]);
};

export async function getAllOrders(
  userId: number
): Promise<GetAllOrdersResponse> {
  if (userId < 0 || !Number.isInteger(userId)) {
    throw new ParameterError('Invalid userId');
  }
  const user: User = await userRepo.getUserById(userId);
  if (!user) {
    throw new NotFoundError("User doesn't exist with this id");
  }
  const orders: Order[] = await orderRepo.getAllOrders(userId);
  return { allOrders: orders };
}

export async function addNewOrder(
  newOrder: NewOrderRequest
): Promise<OrderResponse> {
  if (!newOrder) {
    throw new ParameterError('Invalid product');
  }

  const order = await orderRepo.createOrder(newOrder);
  return orderResponse(order) as OrderResponse;
}
