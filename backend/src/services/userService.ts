import * as userRepo from "../repositories/userRepo";
import {
  RegisterUserRequest,
  RegisterUserRequestValidator,
  User,
} from "../interfaces/user";
import _ from "lodash";
import bcrypt from "bcrypt";

const userResponse = (user: User) => {
  return _.pick(user, ["id", "name", "email", "isAdmin", "isVerified"]);
};

export async function registerUser(
  newUser: RegisterUserRequest
): Promise<User> {
  const validatedUser = await RegisterUserRequestValidator.parseAsync(newUser);
  const hashedPassword = await bcrypt.hash(newUser.password, 10);
  const user = await userRepo.registerUser({
    name: validatedUser.name,
    email: validatedUser.email,
    password: hashedPassword,
  });

  if (user) {
    return userResponse(user);
  } else {
    throw new Error();
  }
}
