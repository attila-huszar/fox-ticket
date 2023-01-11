import request from 'supertest';
import status from 'http-status';
import * as orderRepo from '../src/repositories/orderRepo';
import app from '../src/app';
import Order from '../src/models/Order';
import User from '../src/models/User';
import Person from '../src/models/person';

describe('GET /api/purchases/:id', () => {
  it('returns every order with the status for the given id', async () => {
    const person = {
      name: 'Bácsi'
    };
    try{
    await Person.create(person);
    } catch (error){
      console.log(error)
    }
    const user = {
      name: 'Bácsi',
      email: 'sasa@sadfa.com',
      password: 'asdfasdf',
      isAdmin: true,
      isVerified: true,
      token: 'sdfgdf',
    };
    try {
      await User.create(user);
    } catch (error){
      console.log(error)
    }

    const order = {
      orderDate: Date.now(),
      status: 'not active',
      amount: 1,
      paidDate: Date.now(),
      expirationDate: Date.now(),
      userId: 1,
    };
    try{
    await Order.create(order);
    } catch (error){
      console.log(error)
    }

    const result = await request(app).get(`api/purchases/1`);

    expect(result.statusCode).toEqual(status.OK);
    const { orders } = result.body;
    expect(orders.length).toEqual(1);
  });
});
