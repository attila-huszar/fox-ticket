import axios, { AxiosError } from 'axios'

export async function fetchPendingOrder() {
  const purchases = await axios.get('/api/orders/1')

  return purchases.data.orders
}

export async function fetchRemoveProductFromCart(id: number) {
  await axios.delete(`/api/orders/${id}`)
}

export async function fetchRemovePendingOrderFromCart() {
  await axios.delete('/api/orders')
}

export async function fetchCreateNewPendingOrder(
  orderDate: Date,
  productId: number,
  userId: number,
) {
  try {
    const response = await axios.post('/api/purchases', {
      orderDate,
      productId,
      userId,
    })

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message)
    } else {
      throw new Error('Something went wrong')
    }
  }
}

export async function fetchChangeOrderStatusByUserId() {
  await axios.patch('/api/orders/1')
}

export async function fetchActiveOrders() {
  const purchases = await axios.get('/api/tickets/1')
  return purchases.data.orders
}
