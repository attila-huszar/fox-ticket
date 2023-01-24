import { NotFoundError, ParameterError } from '../errors';
import * as userRepo from '../repositories/userRepo';
import {
  LoginRequest,
  LoginResponse,
  RegisterUserRequest,
  RegisterUserRequestValidator,
} from '../interfaces/user';
import _ from 'lodash';
import bcrypt from 'bcrypt'
import User from '../models/User';

const userResponse = (user: object) => {
  return _.pick(user, ['id', 'name', 'email', 'isAdmin', 'isVerified']);
};

const loginResponse = (user: User) => {
  return _.pick(user, ['token']);
};

export async function registerUser(
  newUser: RegisterUserRequest
): Promise<User> {
  await RegisterUserRequestValidator.parseAsync(newUser);
  const hashedPassword = await bcrypt.hash(newUser.password, 10)
  const user = await userRepo.registerUser({name: newUser.name, email: newUser.email, password: hashedPassword});

  if (user) {
    return userResponse(user) as User;
  } else {
    throw new NotFoundError();
  }
}

export async function loginUser(
  user: LoginRequest
): Promise<LoginResponse> {
  const checkUser = await userRepo.getUserByEmail(user.email)
  if(!checkUser) {
    throw new ParameterError("No user with this email exist")
  }
  const checkPassword = await bcrypt.compare(user.password, checkUser.password)
  
  if (checkPassword) {
    return loginResponse(checkUser) as LoginResponse
  } else {
    throw new ParameterError("Wrong Password")
  }
}