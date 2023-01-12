import status from 'http-status';

export default class HttpError extends Error {
  statusCode: number;

  constructor(statusCode: number, message?: string) {
    if (!message) {
      message = status[statusCode] as string;
    }
    super(message);
    this.statusCode = statusCode;
  }
}
