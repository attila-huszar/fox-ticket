import { Request, Response, NextFunction } from 'express'
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } from 'http-status'
import { HttpError, NotFoundError, ParameterError } from '../errors'
import {
  GetAllOrdersResponse,
  NewOrderRequest,
  OrderResponse,
  UpdateOrderStatusResponse,
  PendingOrdersResponse,
} from '../interfaces/order'
import * as orderService from '../services/orderService'

export function getAllOrders(
  req: Request<{ userId: number }, unknown, unknown, unknown>,
  res: Response<GetAllOrdersResponse>,
  next: NextFunction,
): void {
  const userId = Number(req.params.userId)

  orderService
    .getAllOrders(userId)
    .then((data) => res.send(data))
    .catch((error) => {
      if (error instanceof ParameterError) {
        next(new HttpError(BAD_REQUEST, error.message))
      } else if (error instanceof NotFoundError) {
        next(new HttpError(NOT_FOUND))
      } else {
        next(new HttpError(INTERNAL_SERVER_ERROR))
      }
    })
}

export function addNewOrder(
  req: Request<unknown, unknown, NewOrderRequest, unknown>,
  res: Response<OrderResponse>,
  next: NextFunction,
): void {
  const order = req.body

  orderService
    .addNewOrder(order)
    .then((result) => res.send(result))
    .catch((error) => {
      console.log(error)
      if (error instanceof ParameterError) {
        next(new HttpError(BAD_REQUEST, error.message))
      } else {
        next(new HttpError(INTERNAL_SERVER_ERROR))
      }
    })
}

export function getPendingOrders(
  req: Request<{ userId: number }, unknown, unknown, unknown>,
  res: Response<PendingOrdersResponse>,
  next: NextFunction,
): void {
  const userId = Number(req.params.userId)

  orderService
    .getAllPendingOrdersByUserId(userId)
    .then((data) => res.send(data))
    .catch((error) => {
      if (error instanceof ParameterError) {
        next(new HttpError(BAD_REQUEST, error.message))
      } else if (error instanceof NotFoundError) {
        next(new HttpError(NOT_FOUND))
      } else {
        next(new HttpError(INTERNAL_SERVER_ERROR))
      }
    })
}

export function changeOrderStatusByUserId(
  req: Request<{ userId: number }, unknown, unknown, unknown>,
  res: Response<UpdateOrderStatusResponse>,
  next: NextFunction,
): void {
  const userId = Number(req.params.userId)

  orderService
    .changeOrderStatusByUserId(userId)
    .then((data) => res.send(data))
    .catch((error) => {
      console.log(error)
      if (error instanceof ParameterError) {
        next(new HttpError(BAD_REQUEST, error.message))
      } else if (error instanceof NotFoundError) {
        next(new HttpError(NOT_FOUND, error.message))
      } else {
        next(new HttpError(INTERNAL_SERVER_ERROR))
      }
    })
}

export function getActiveOrders(
  req: Request<{ userId: number }, unknown, unknown, unknown>,
  res: Response<PendingOrdersResponse>,
  next: NextFunction,
): void {
  const userId = Number(req.params.userId)

  orderService
    .getActiveOrdersByUserId(userId)
    .then((data) => {
      console.log(data)
      res.send(data)
    })
    .catch((error) => {
      if (error instanceof ParameterError) {
        next(new HttpError(BAD_REQUEST, error.message))
      } else if (error instanceof NotFoundError) {
        next(new HttpError(NOT_FOUND))
      } else {
        next(new HttpError(INTERNAL_SERVER_ERROR))
      }
    })
}
