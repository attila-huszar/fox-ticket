import request from 'supertest';
import status from 'http-status';
import app from '../src/app';
import Order from '../src/models/Order';
import User from '../src/models/User';
import Product from '../src/models/Product';

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

    const product = {
      name: 'One month pass',
      price: 365,
      duration: 30,
      description: 'use this for a month',
      type: 'pass',
    };

    await Product.create(product);

    const order = {
      orderDate: Date.now(),
      status: 'pending',
      paidDate: Date.now(),
      expirationDate: Date.now(),
      productId: 1,
      userId: 1,
    };

    await Order.create(order);

    const result = await request(app).get(`/api/orders/1`);

    expect(result.statusCode).toEqual(status.OK);
    const  pendingOrders  = result.body.orders;
    expect(pendingOrders.length).toEqual(1);
  });
});

describe('PATCH /api/orders/:userId', () => {
  it('returns every just modified paid status orders after request for the given user id', async () => {
    await User.create({
      id: 1,
      name: 'Bácsi',
      email: 'sasa@sadfa.com',
      password: 'asdfasdf',
      isAdmin: false,
      isVerified: true,
      token: 'sdfgdf',
    });

    await Product.create({
      name: '1 weeks pass',
      price: 3400,
      duration: 16,
      description: 'Use this pass forever!',
      type: 'ticket',
    });

    await Order.create({
      orderDate: '2022.01.18.',
      status: 'pending',
      paidDate: '2022.01.18.',
      expirationDate: null,
      productId: 1,
      userId: 1,
    });

    const editedOrder = {
      orderDate: '2022.01.18.',
      status: 'paid',
      paidDate: '2022.01.18.',
      expirationDate: null,
      productName: '1 weeks pass',
    };

    const result = await request(app).patch(`/api/orders/1`).send(editedOrder);

    expect(result.statusCode).toEqual(status.OK);
    const changedOrderStatus = result.body.purchases;

    expect(changedOrderStatus).toEqual([
      {
        id: 1,
        status: 'paid',
        paidDate: Date(),
        expirationDate: null,
        productName: '1 weeks pass',
      },
    ]);
  });

  it('returns Bad Request for missing or bad id parameter', async () => {
    const newUser = await User.create({
      id: 1,
      name: 'Bácsi',
      email: 'sasa@sadfa.com',
      password: 'asdfasdf',
      isAdmin: false,
      isVerified: true,
      token: 'sdfgdf',
    });

    const newProduct = await Product.create({
      name: '1 weeks pass',
      price: 3400,
      duration: 16,
      description: 'Use this pass forever!',
      type: 'ticket',
    });

    const order = await Order.create({
      orderDate: Date.now(),
      status: 'pending',
      paidDate: Date.now(),
      expirationDate: null,
      userId: 1,
    });

    const changedOrderStatus = {
      orderDate: Date.now(),
      status: 'pending',
      paidDate: Date.now(),
      expirationDate: null,
      userId: 1,
    };

    const result = await request(app).patch('/api/orders/k').send(order);
    expect(result.statusCode).toEqual(status.BAD_REQUEST);
  });

  it('Returns Not Found for missing Product', async () => {
    const newUser = await User.create({
      id: 1,
      name: 'Bácsi',
      email: 'sasa@sadfa.com',
      password: 'asdfasdf',
      isAdmin: false,
      isVerified: true,
      token: 'sdfgdf',
    });

    const newProduct = await Product.create({
      name: '1 weeks pass',
      price: 3400,
      duration: 16,
      description: 'Use this pass forever!',
      type: 'ticket',
    });

    const order = await Order.create({
      orderDate: Date.now(),
      status: 'pending',
      paidDate: Date.now(),
      expirationDate: null,
      userId: 1,
    });

    const changedOrderStatus = {
      orderDate: Date.now(),
      status: 'pending',
      paidDate: Date.now(),
      expirationDate: null,
      userId: 1,
    };

    const result = await request(app).patch('/api/orders/5').send(order);
    expect(result.statusCode).toEqual(status.NOT_FOUND);
  });
});
