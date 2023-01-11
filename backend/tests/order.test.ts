import request from 'supertest';
import status from 'http-status';
import * as orderRepo from '../src/repositories/orderRepo';
import app from '../src/app';
import Order from '../src/models/Order';

describe('GET /api/purchases/:id', () => {
  it('returns every order with the status for the given id', async () => {
    const order = {
      orderDate: (Date.now()),
      status: 'not active',
      amount: 1,
      paidDate: (Date.now()),
      expirationDate: (Date.now()),
      userId: 1,
    };
    await Order.create(order);
    const result = await request(app).get(`api/purchases/1`);

    expect(result.statusCode).toEqual(status.OK);
    const { orders } = result.body;
    expect(orders.length).toEqual(1);
  });
});
