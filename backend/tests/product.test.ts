import request from 'supertest';
import status from 'http-status';
import * as productRepo from '../src/repositories/productRepo';
import app from '../src/app';
import Product from '../src/models/Product';

describe('POST /api/admin/products', () => {
  it('returns the JSON for the created product', async () => {
    const newProduct = {
      name: '1 week pass',
      price: 12000,
      duration: 168,
      description: 'Use this pass for a whole week!',
      type: 'pass',
    };

    const result = await request(app)
      .post(`/api/admin/products`)
      .send(newProduct);

    expect(result.statusCode).toEqual(status.OK);
    const product = result.body;
    expect(product).toEqual({
      id: 1,
      name: '1 week pass',
      price: 12000,
      duration: 168,
      description: 'Use this pass for a whole week!',
      type: 'pass',
    });
    expect(productRepo.getProductByName('1 week pass')).toBeTruthy();
  });

  it('returns Bad Request for missing parameter', async () => {
    const newProduct = {
      price: 12000,
      duration: 168,
      description: 'Use this pass for a whole week!',
      type: 'pass',
    };

    const result = await request(app)
      .post('/api/admin/products')
      .send(newProduct);
    expect(result.statusCode).toEqual(status.BAD_REQUEST);
  });

  it('should send an error back with a message of Name already exists', async () => {
    const newProduct = {
      name: '1 week pass',
      price: 12000,
      duration: 168,
      description: 'Use this pass for a whole week!',
      type: 'pass',
    };

    await productRepo.createProduct({
      name: '1 week pass',
      price: 12000,
      duration: 168,
      description: 'Use this pass for a whole week!',
      type: 'pass',
    });

    const result = await request(app)
      .post(`/api/admin/products`)
      .send(newProduct);

    expect(result.statusCode).toEqual(status.BAD_REQUEST);
    const product = result.body;
    expect(product).toEqual({
      message: 'Validation error: Name already exists',
    });
    expect(productRepo.getProductByName('1 week pass')).toBeTruthy();
  });
});

describe('DELETE /api/admin/products/:productId', () => {
  it('deletes an existing product', async () => {
    const product = await Product.create({
      name: '1 week pass',
      price: 12000,
      duration: 168,
      description: 'Use this pass for a whole week!',
      type: 'pass',
    });

    const result = await request(app).delete(`/api/admin/products/1`);

    expect(result.statusCode).toEqual(status.OK);
    expect(await productRepo.getProductById(1)).toBeFalsy();
  });

  it('returns invalid productId for wrond id parameter', async () => {
    const result = await request(app).delete('/api/admin/products/asd');
    expect(result.statusCode).toEqual(status.BAD_REQUEST);
    const product = result.body;
    expect(product).toEqual({
      message: 'Invalid productId',
    });
  });
});
