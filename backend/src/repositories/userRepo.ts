import { RegisterRequestWithToken } from "../interfaces/user";
import User from "../models/User";

export function registerUser(newUser: RegisterRequestWithToken): Promise<User> {
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

export function getUserByVerToken(token: string): Promise<User | null> {
  return User.findOne({
    where: { verificationToken: token },
  });
}
export function setUserVerified(user: User): Promise<[affectedCount: number]> {
  return User.update(
    {
      isVerified: true,
    },
    {
      where: { id: user.id },
    }
  );
}
