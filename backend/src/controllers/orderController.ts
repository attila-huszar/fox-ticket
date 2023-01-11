import { Request, Response, NextFunction } from 'express';
import status from 'http-status';
import { HttpError, NotFoundError, ParameterError } from '../errors';
import {
  GetAllOrdersResponse,
  NewOrderRequest,
  NewOrderResponse,
} from '../interfaces/order';
import * as orderService from '../services/orderService';

export async function getAllOrders(
  req: Request<{ userId: number }, unknown, unknown, unknown>,
  res: Response<GetAllOrdersResponse>,
  next: NextFunction
): Promise<any> {
  const params = Number(req.params.userId);

  try {
    const data = await orderService.getAllOrders(params);
    res.send(data);
  } catch (error) {
    next(new HttpError(status.INTERNAL_SERVER_ERROR));
  }
}

export async function addNewOrder(
  req: Request<unknown, unknown, NewOrderRequest, unknown>,
  res: Response<NewOrderResponse>,
  next: NextFunction
): Promise<void> {
  const order = req.body;

  try {
    const result = await orderService.addNewOrder(order);
    res.send(result);
  } catch (error) {
    if (error instanceof ParameterError) {
      next(new HttpError(status.BAD_REQUEST, error.message));
    } else if (error instanceof NotFoundError) {
      next(new HttpError(status.NOT_FOUND));
    } else {
      next(new HttpError(status.INTERNAL_SERVER_ERROR));
    }
  }
}
