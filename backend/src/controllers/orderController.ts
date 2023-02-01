import { Request, Response, NextFunction } from 'express';
import status from 'http-status';
import { HttpError, NotFoundError, ParameterError } from '../errors';
import {
  GetAllOrdersResponse,
  NewOrderRequest,
  OrderResponse,
  UpdateOrderStatusResponse,
  PendingOrdersResponse,
} from '../interfaces/order';
import * as orderService from '../services/orderService';

export async function getAllOrders(
  req: Request<{ userId: number }, unknown, unknown, unknown>,
  res: Response<GetAllOrdersResponse>,
  next: NextFunction
): Promise<void> {
  const userId = Number(req.params.userId);

  try {
    const data = await orderService.getAllOrders(userId);
    res.send(data);
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

export async function addNewOrder(
  req: Request<unknown, unknown, NewOrderRequest, unknown>,
  res: Response<OrderResponse>,
  next: NextFunction
): Promise<void> {
  const order = req.body;

  try {
    const result = await orderService.addNewOrder(order);
    res.send(result);
  } catch (error) {
    console.log(error);
    if (error instanceof ParameterError) {
      next(new HttpError(status.BAD_REQUEST, error.message));
    } else {
      next(new HttpError(status.INTERNAL_SERVER_ERROR));
    }
  }
}

export async function getPendingOrders(
  req: Request<{ userId: number }, unknown, unknown, unknown>,
  res: Response<PendingOrdersResponse>,
  next: NextFunction
): Promise<void> {
  const userId = Number(req.params.userId);

  try {
    const data = await orderService.getAllPendingOrdersByUserId(userId);
    res.send(data);
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

export async function changeOrderStatusByUserId(
  req: Request<{ userId: number }, unknown, unknown, unknown>,
  res: Response<UpdateOrderStatusResponse>,
  next: NextFunction
): Promise<void> {
  const userId = Number(req.params.userId);

  try {
    const data = await orderService.changeOrderStatusByUserId(userId);
    res.send(data);
  } catch (error) {
    console.log(error);
    if (error instanceof ParameterError) {
      next(new HttpError(status.BAD_REQUEST, error.message));
    } else if (error instanceof NotFoundError) {
      next(new HttpError(status.NOT_FOUND, error.message));
    } else {
      next(new HttpError(status.INTERNAL_SERVER_ERROR));
    }
  }
}

export async function getActiveOrders(
  req: Request<{ userId: number }, unknown, unknown, unknown>,
  res: Response<PendingOrdersResponse>,
  next: NextFunction
): Promise<void> {
  const userId = Number(req.params.userId);

  try {
    const data = await orderService.getActiveOrdersByUserId(userId);
    console.log(data)    
    res.send(data);
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
