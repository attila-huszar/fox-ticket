import request from 'supertest';
import status from 'http-status';
import app from '../src/app';
import Order from '../src/models/Order';
import User from '../src/models/User';
import Person from '../src/models/person';

describe('GET /api/purchases/:id', () => {
  it('returns every order with the status for the given id', async () => {
    const user = {
      id: 1,
      name: 'Bácsi',
      email: 'sasa@sadfa.com',
      password: 'asdfasdf',
      isAdmin: true,
      isVerified: true,
      token: 'sdfgdf',
    };

    await User.create(user);

    const order = {
      orderDate: Date.now(),
      status: 'not active',
      amount: 1,
      paidDate: Date.now(),
      expirationDate: Date.now(),
      userId: 1,
    };

    await Order.create(order);

    const result = await request(app).get(`/api/purchases/1`);

    expect(result.statusCode).toEqual(status.OK);
    const { allOrders } = result.body;
    expect(allOrders.length).toEqual(1);
  });  
});

describe('GET /api/orders/:id', () => {
  it('returns pending orders for the given UserId', async () => {
    const user = {
      id: 1,
      name: 'Bácsi',
      email: 'sasa@sadfa.com',
      password: 'asdfasdf',
      isAdmin: true,
      isVerified: true,
      token: 'sdfgdf',
    };

    await User.create(user);

    const order = {
      orderDate: Date.now(),
      status: 'pending',
      amount: 1,
      paidDate: Date.now(),
      expirationDate: Date.now(),
      userId: 1,
    };

    await Order.create(order);

    const result = await request(app).get(`/api/orders/1`);

    expect(result.statusCode).toEqual(status.OK);
    const { pendingOrders } = result.body;
    expect(pendingOrders.length).toEqual(1);
  });  
});
