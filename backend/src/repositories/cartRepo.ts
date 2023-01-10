import Order from '../models/Order';

export function removeOrderFromCart(orderId: number): Promise<number> {
  return Order.destroy({ where: { id: orderId } });
}

export function removePendingOrderFromCart(): Promise<number> {
  return Order.destroy({ where: { status: 'pending' } });
}
