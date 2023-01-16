import { NotFoundError, ParameterError } from '../errors';
import * as userRepo from '../repositories/userRepo';
import {
  RegisterUserRequest,
  RegisterUserRequestValidator,
  UserResponse,
} from '../interfaces/user';
import _ from 'lodash';

const userResponse = (user: object) => {
  return _.pick(user, ['id', 'name', 'email', 'isAdmin', 'isVerified']);
};

export async function registerUser(
  newUser: RegisterUserRequest
): Promise<UserResponse> {
  if (!newUser) {
    throw new ParameterError('Invalid user');
  }
  await RegisterUserRequestValidator.parseAsync(newUser);
  const user = await userRepo.registerUser(newUser);

  if (user) {
    return userResponse(user) as UserResponse;
  } else {
    throw new NotFoundError();
  }
}
