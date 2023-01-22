import { NotFoundError, ParameterError } from '../errors';
import * as userRepo from '../repositories/userRepo';
import {
  RegisterUserRequest,
  RegisterUserRequestValidator,
  User,
} from '../interfaces/user';
import _ from 'lodash';
import bcrypt from 'bcrypt'

const userResponse = (user: object) => {
  return _.pick(user, ['id', 'name', 'email', 'isAdmin', 'isVerified']);
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
