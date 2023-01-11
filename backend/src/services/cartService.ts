import { NotFoundError, ParameterError } from '../errors';
import * as cartRepo from '../repositories/cartRepo';

export async function removeProductFromCart(
  orderId: number
): Promise<{ orderId: number }> {
  if (orderId < 0 || !Number.isInteger(orderId)) {
    throw new ParameterError('Invalid orderId');
  }

  const deletedRows = await cartRepo.removeOrderFromCart(orderId);

  if (deletedRows == 0) {
    throw new NotFoundError();
  } else {
    return { orderId: orderId };
  }
}

export async function removePendingOrderFromCart(): Promise<void> {
  await cartRepo.removePendingOrderFromCart();
}