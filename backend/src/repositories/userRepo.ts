import { RegisterUserRequest } from '../interfaces/user';
import User from '../models/User';

export function registerUser(newUser: RegisterUserRequest): Promise<User> {
  return User.create({ ...newUser });
}

export function getUserByName(username: string): Promise<User | null> {
  return User.findOne({ where: { name: username } });
}

export function getUserById(userId: number): Promise<User | null> {
  return User.findByPk(userId);
}

export function getUserByEmail(userEmail: string): Promise<User | null> {
  return User.findOne({ where: { email: userEmail } });
}
