export interface AuthorizedRequest {
  email: string;
  headers: {
    authorization?: string;
  };
}
