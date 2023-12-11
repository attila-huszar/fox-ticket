import { NotFoundError, ParameterError } from '../errors';
import {
  GetAllOrdersResponse,
  NewOrderRequest,
  OrderResponse,
  UpdateOrderStatusResponse,
  PendingOrdersResponse,
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
  userId: number,
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
  newOrder: NewOrderRequest,
): Promise<OrderResponse> {
  if (!newOrder) {
    throw new ParameterError('Invalid product');
  }

  const order = await orderRepo.createOrder(newOrder);
  return orderResponse(order) as OrderResponse;
}

export async function getAllPendingOrdersByUserId(
  userId: number,
): Promise<PendingOrdersResponse> {
  if (userId < 0 || !Number.isInteger(userId)) {
    throw new ParameterError('Invalid userId');
  }

  const user: User = await userRepo.getUserById(userId);
  if (!user) {
    throw new NotFoundError("User doesn't exist with this id");
  }

  const response: Order[] = await orderRepo.getAllPendingOrders(userId);
  const orders = [];

  for (let i = 0; i < response.length; i++) {
    const order = {
      id: response[i].id,
      status: response[i].status,
      orderDate: response[i].orderDate,
      name: response[i].product?.name,
      price: response[i].product?.price,
    };
    orders.push(order);
  }

  return { orders: orders };
}

export async function changeOrderStatusByUserId(
  userId: number,
): Promise<UpdateOrderStatusResponse> {
  if (userId < 0 || !Number.isInteger(userId)) {
    throw new ParameterError('Invalid userId');
  }

  const user: User = await userRepo.getUserById(userId);

  if (!user) {
    throw new NotFoundError("User doesn't exist with this id");
  }

  const findPendingOrders = await orderRepo.getAllPendingOrders(userId);

  if (findPendingOrders.length === 0) {
    throw new NotFoundError("User doesn't have pending order(s) in cart");
  } else {
    await orderRepo.changeOrderStatusByUserId(userId);
    const purchases = [];

    for (let i = 0; i < findPendingOrders.length; i++) {
      const order = findPendingOrders[i];
      const updatedPurchase = {
        id: order.id,
        status: 'paid',
        paidDate: Date(),
        expirationDate: null,
        productName: order.product.name,
      };
      purchases.push(updatedPurchase);
    }

    return { purchases };
  }
}

export async function getActiveOrdersByUserId(
  userId: number,
): Promise<PendingOrdersResponse> {
  if (userId < 0 || !Number.isInteger(userId)) {
    throw new ParameterError('Invalid userId');
  }

  const user: User = await userRepo.getUserById(userId);

  if (!user) {
    throw new NotFoundError("User doesn't exist with this id");
  }

  const response: Order[] = await orderRepo.getActiveOrders(userId);
  const orders = [];

  for (let i = 0; i < response.length; i++) {
    const order = {
      id: response[i].id,
      status: response[i].status,
      orderDate: response[i].orderDate,
      name: response[i].product?.name,
      price: response[i].product?.price,
      description: response[i].product.description,
    };
    orders.push(order);
  }

  return { orders: orders };
}
