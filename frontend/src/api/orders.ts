import axios from 'axios';

export async function fetchPendingOrder() {
  const purchases = await axios.get('/api/orders/2');

  return purchases.data.orders;
}

export async function fetchRemoveProductFromCart(id: number) {
  await axios.delete(`/api/orders/${id}`);
}

export async function fetchRemovePendingOrderFromCart() {
  await axios.delete('/api/orders');
}
