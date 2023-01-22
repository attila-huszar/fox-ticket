import { User } from '../interfaces/user';

export const mockUsers: User[] = [
  {
    email: 'admin@foxticket.com',
    password: 'admin123',
    isAdmin: true,
    isVerified: true,
  },
  {
    email: 'user@foxticket.com',
    password: 'user1234',
    isAdmin: false,
    isVerified: true,
  },
  {
    email: 'cinkes@gmail.com',
    password: 'admin123',
    isAdmin: true,
    isVerified: false,
  },
];
