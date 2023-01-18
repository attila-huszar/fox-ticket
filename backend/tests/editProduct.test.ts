import request from 'supertest';
import status from 'http-status';
import * as productRepo from '../src/repositories/productRepo';
import app from '../src/app';
import Product from '../src/models/Product';

describe('PUT /api/admin/products/:productId', () => {
  it('edit one or more product field by id for existing Product', async () => {
    const newProduct = await Product.create({
      name: '1 weeks pass',
      price: 3400,
      duration: 16,
      description: 'Use this pass forever!',
      type: 'ticket',
    });

    const editedProduct = {
      name: '5 weeks pass',
      price: 340000,
      duration: 168,
      description: 'Use this pass for a whole week!',
      type: 'pass',
    };

    const result = await request(app).put(`/api/admin/products/1`).send(editedProduct);
    expect(result.statusCode).toEqual(status.OK);

    const { name, price, duration, description, type } = result.body;
    expect(name).toEqual('5 weeks pass');
    expect(price).toEqual(340000);
    expect(duration).toEqual(168);
    expect(description).toEqual('Use this pass for a whole week!');
    expect(type).toEqual('pass');
  });

  it('returns Bad Request for missing or bad id parameter', async () => {
    const newProduct = await Product.create({
      name: '1 weeks pass',
      price: 3400,
      duration: 16,
      description: 'Use this pass forever!',
      type: 'ticket',
    });

    const editedProduct = {
      name: '5 weeks pass',
      price: 340000,
      duration: 168,
      description: 'Use this pass for a whole week!',
      type: 'pass',
    };

    const result = await request(app).put('/api/admin/products/k').send(editedProduct);
    expect(result.statusCode).toEqual(status.BAD_REQUEST);
  });

  it('Returns Not Found for missing Product', async () => {
    const newProduct = await Product.create({
      name: '1 weeks pass',
      price: 3400,
      duration: 16,
      description: 'Use this pass forever!',
      type: 'ticket',
    });

    const editedProduct = {
      name: '5 weeks pass',
      price: 340000,
      duration: 168,
      description: 'Use this pass for a whole week!',
      type: 'pass',
    };

    const result = await request(app).put('/api/admin/products/5').send(editedProduct);
    expect(result.statusCode).toEqual(status.NOT_FOUND);
  });
});
