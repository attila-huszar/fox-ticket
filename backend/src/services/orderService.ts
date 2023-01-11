import { NotFoundError, ParameterError } from '../errors';
import { GetAllOrdersResponse, NewOrderRequest, NewOrderResponse, PurchasedOrdersResponse } from '../interfaces/order';
import Order from '../models/Order';
import * as orderRepo from "../repositories/orderRepo";

export async function getAllOrders(userId: number): 
Promise<GetAllOrdersResponse> {
  const orders: Order[] = await orderRepo.getAllOrders(userId);
  return { allOrders: orders };
}

export async function addNewOrder(newOrder: NewOrderRequest):Promise <NewOrderResponse> {
  if(!newOrder){
    throw new ParameterError("Invalid product");
  }
  const order = await orderRepo.createOrder(newOrder);
  return { newOrder: order}
}

