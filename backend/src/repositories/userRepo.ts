import User from '../models/User'
import { db } from '../db'
import { RegisterRequestWithToken } from '../interfaces/user'
import { QueryTypes } from 'sequelize'

export function registerUser(newUser: RegisterRequestWithToken): Promise<User> {
  return User.create({ ...newUser })
}

export function getUserByName(username: string): Promise<User | null> {
  return User.findOne({ where: { name: username } })
}

export function getUserById(userId: number): Promise<User | null> {
  return User.findByPk(userId)
}

export function getUserByEmail(userEmail: string): Promise<User | null> {
  return User.findOne({ where: { email: userEmail } })
}

export function getUserByVerToken(token: string): Promise<User | null> {
  return User.findOne({
    where: { verificationToken: token },
  })
}

export function setUserVerified(user: User): Promise<User[]> {
  return db.query(`UPDATE users SET isVerified = 1 WHERE id = ${user.id}`, {
    model: User,
    type: QueryTypes.UPDATE,
  })
}
