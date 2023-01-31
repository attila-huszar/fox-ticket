import axios, { AxiosError } from 'axios';

export async function fetchPendingOrder() {
  const purchases = await axios.get('/api/orders/1');

  return purchases.data.orders;
}

export async function fetchRemoveProductFromCart(id: number) {
  await axios.delete(`/api/orders/${id}`);
}

export async function fetchRemovePendingOrderFromCart() {
  await axios.delete('/api/orders');
}

export async function fetchCreateNewPendingOrder(orderDate: Date, id: number, userId: number ) {
  console.log(orderDate, id, userId)
  try {
    const response = await axios.post('/api/purchases', {
      orderDate,
      id,
      userId      
    });
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error
  }
}