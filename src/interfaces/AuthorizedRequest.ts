export interface AuthorizedRequest extends Request {
  email: string;
  Headers: {
    Authorization?: string;
  };
}
