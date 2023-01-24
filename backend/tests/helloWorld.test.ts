import request from 'supertest';
import status from 'http-status';
import * as personRepo from '../src/repositories/personRepo';
import app from '../src/app';

describe('GET /api/hello', () => {
  it('returns greeting for existing Person', async () => {
    const person = await personRepo.createPerson('Johnny');

    const result = await request(app).get(`/api/hello?personId=${person.id}`);

    expect(result.statusCode).toEqual(status.OK);
    const { greeting } = result.body;
    expect(greeting).toEqual('Hello Johnny!');
  });

  it('returns Bad Request for missing query string parameter', async () => {
    const result = await request(app).get('/api/hello');
    expect(result.statusCode).toEqual(status.BAD_REQUEST);
  });

  it('Returns Not Found for missing Person', async () => {
    const result = await request(app).get('/api/hello?personId=1');
    expect(result.statusCode).toEqual(status.NOT_FOUND);
  });
});
