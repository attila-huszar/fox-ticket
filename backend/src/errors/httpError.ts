import status from 'http-status'

export default class HttpError extends Error {
  statusCode: number

  constructor(
    statusCode: number,
    message: string = status[statusCode as keyof typeof status] as string,
  ) {
    super(message)
    this.statusCode = statusCode
  }
}
