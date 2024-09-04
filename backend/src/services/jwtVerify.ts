import jwt, { Secret } from 'jsonwebtoken'

export function verifyAccessToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN as Secret)
    return decoded
  } catch {
    throw new Error('Invalid Credentials')
  }
}

export function verifyRefreshToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN as Secret)
    return decoded
  } catch {
    throw new Error('Invalid Credentials')
  }
}
