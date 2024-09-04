import { Request, Response, NextFunction } from 'express'
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } from 'http-status'
import { HttpError, NotFoundError, ParameterError } from '../errors'
import * as cartService from '../services/cartService'

export function removeProductFromCart(
  req: Request<{ orderId: number }, unknown, unknown, unknown>,
  res: Response<{ orderId: number }>,
  next: NextFunction,
): void {
  const removedOrderId = Number(req.params.orderId)

  cartService
    .removeProductFromCart(removedOrderId)
    .then((result) => res.send(result))
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

export function removePendingOrderFromCart(
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response<number>,
  next: NextFunction,
): void {
  cartService
    .removePendingOrderFromCart()
    .then((result) => res.send(result))
    .catch((error) => {
      if (error instanceof ParameterError) {
        next(new HttpError(BAD_REQUEST, error.message))
      } else if (error instanceof NotFoundError) {
        next(new HttpError(NOT_FOUND))
      } else {
        console.log(error)
        next(new HttpError(INTERNAL_SERVER_ERROR))
      }
    })
}
