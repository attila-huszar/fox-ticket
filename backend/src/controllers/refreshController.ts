import { Request, Response } from 'express'
import { OK, UNAUTHORIZED } from 'http-status'
import { verifyRefreshToken } from '../services/jwtVerify'
import { signAccessToken, signRefreshToken } from '../services/jwtSign'
import { RegisterResponse } from '../interfaces/user'

export function refresh(req: Request, res: Response) {
  const cookie = req.headers.cookie?.split('=')[1]

  if (cookie) {
    const decoded = verifyRefreshToken(cookie)

    if (decoded instanceof Error)
      return res.status(UNAUTHORIZED).json({ success: false, message: decoded })

    const user: RegisterResponse = {
      email: decoded as string,
    }

    const accessToken = signAccessToken(user)
    const refreshToken = signRefreshToken(user)

    res.cookie('jwt', refreshToken, {
      path: '/api/refresh',
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    res.status(OK).json({ token: accessToken })
  } else {
    res.status(UNAUTHORIZED).json({ success: false, message: 'Unauthorized' })
  }
}
