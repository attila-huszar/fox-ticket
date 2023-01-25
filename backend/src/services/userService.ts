import { NotFoundError, ParameterError } from "../errors";
import * as userRepo from "../repositories/userRepo";
import {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
} from "../interfaces/user";
import _ from "lodash";
import bcrypt from "bcrypt";
import { sendVerificationEmail } from "./sendVerificationEmail";

const registerResponse = (user: RegisterResponse) => {
  return _.pick(user, ["id", "name", "email", "isAdmin", "isVerified"]);
};

const loginResponse = (user: LoginResponse) => {
  return _.pick(user, ["name", "email", "isAdmin", "token"]);
};

export async function registerUser(
  newUser: RegisterRequest
): Promise<RegisterResponse> {
  await RegisterRequest.parseAsync(newUser);
  const hashedPassword = await bcrypt.hash(newUser.password, 10);
  const verificationToken = await sendVerificationEmail(newUser);

  const user = await userRepo.registerUser({
    name: newUser.name,
    email: newUser.email,
    password: hashedPassword,
    verificationToken: verificationToken,
  });
  
  if (user.dataValues) {
    return registerResponse(user.dataValues);
  } else {
    throw new NotFoundError();
  }
}

export async function loginUser(user: LoginRequest): Promise<LoginResponse> {
  const checkUser: LoginRequest | null = await userRepo.getUserByEmail(
    user.email
  );
  if (!checkUser) {
    throw new ParameterError("The email address or password is incorrect");
  }
  const checkPassword = await bcrypt.compare(user.password, checkUser.password);

  if (checkPassword) {
    return loginResponse(checkUser);
  } else {
    throw new ParameterError("The email address or password is incorrect");
  }
}
