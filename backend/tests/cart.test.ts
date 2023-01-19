import request from 'supertest';
import status from 'http-status';
import * as cartRepo from '../src/repositories/cartRepo';
import app from '../src/app';
import Order from '../src/models/Order';

describe('DELETE /api/orders/:orderId', () => {
    it('deletes an existing order by ID', async () => {
      const order = await Order.create({
        orderDate: '2023-09-09',
        status: 'pending',
        amount: 203,
        paidDate: '2023-09-09',
        expirationDate: '2023-09-09'
      });
  
      const result = await request(app).delete(`/api/orders/1`);
  
      expect(result.statusCode).toEqual(status.OK);
      expect(await cartRepo.removeOrderFromCart(1)).toBeFalsy();
    });
  
    it('deletes all pending orders ', async () => {
      const result = await request(app).delete('/api/orders');
      expect(result.statusCode).toEqual(status.OK);      
      expect(await cartRepo.getAllPendingOrdersFromCart()).toEqual([]);
      
    });
  
    it('returns invalid productId for wrong id parameter', async () => {
      const result = await request(app).delete('/api/orders/ref');
      expect(result.statusCode).toEqual(status.BAD_REQUEST);
      const order = result.body;
      expect(order).toEqual({
        message: 'Invalid orderId',
      });
    });

  });
  

