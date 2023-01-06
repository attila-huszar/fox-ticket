import Product from '../models/Product';

export interface GetProductRequest {
  productId: number;
}
export interface GetProductResponse {
  id: number;
  name: string;
  price: number;
  duration: number;
  description: string;
  type: string;
}
