import { Request, Response, NextFunction } from 'express';
import status, { BAD_REQUEST } from 'http-status';
import { HttpError, NotFoundError, ParameterError } from '../errors';
import * as cartService from '../services/cartService';

export async function removeProductFromCart(
  req: Request<{ orderId: number }, unknown, unknown, unknown>,
  res: Response<{ orderId: number }>,
  next: NextFunction
): Promise<void> {
  const removedOrderId = Number(req.params.orderId);

  try {
    const result = await cartService.removeProductFromCart(removedOrderId);
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

export async function removePendingOrderFromCart(
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response<void>,
  next: NextFunction
): Promise<void> {
  try {
    const result = await cartService.removePendingOrderFromCart();
    res.send(result);
  } catch (error) {
    if (error instanceof ParameterError) {
      next(new HttpError(status.BAD_REQUEST, error.message));
    } else if (error instanceof NotFoundError) {
      next(new HttpError(status.NOT_FOUND));
    } else {
      console.log(error);
      next(new HttpError(status.INTERNAL_SERVER_ERROR));
    }
  }
}
