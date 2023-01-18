import request from 'supertest';
import status from 'http-status';
import * as userRepo from '../src/repositories/userRepo';
import app from '../src/app';

describe('POST /api/register', () => {
  it('returns the JSON for the registered user', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'asd@asd.com',
      password: 'johndoe123',
    };

    const result = await request(app).post(`/api/register`).send(newUser);

    expect(result.statusCode).toEqual(status.OK);
    const user = result.body;
    expect(user).toEqual({
      id: 1,
      name: 'John Doe',
      email: 'asd@asd.com',
      isAdmin: false,
      isVerified: false,
    });
    expect(userRepo.getUserByName('John Doe')).toBeTruthy();
  });

  it('returns Bad Request for missing parameter', async () => {
    const newUser = {
      email: 'asd@asd.com',
      password: 'johndoe123',
    };

    const result = await request(app).post('/api/register').send(newUser);
    expect(result.statusCode).toEqual(status.BAD_REQUEST);
  });

  it('should send an error back with a message of Password must be at least 8 characters.', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'asd@asd.com',
      password: 'johndoe',
    };

    const result = await request(app).post(`/api/register`).send(newUser);

    expect(result.statusCode).toEqual(status.BAD_REQUEST);
    const user = result.body;
    expect(user).toEqual({
      message:
        'Validation error: Password must be at least 8 characters. at "password"',
    });
  });

  it('should send an error back with a message of Email already taken', async () => {
    const newUser = {
      name: 'John Wick',
      email: 'asd@asd.com',
      password: 'johnwick123',
    };
    const person = await userRepo.registerUser({
      name: 'John Doe',
      email: 'asd@asd.com',
      password: 'johndoe123',
    });

    const result = await request(app).post(`/api/register`).send(newUser);

    expect(result.statusCode).toEqual(status.BAD_REQUEST);
    const user = result.body;
    expect(user).toEqual({
      message: 'Validation error: Email is already taken',
    });
    expect(userRepo.getUserByEmail('asd@asd.com')).toBeTruthy();
  });
});
