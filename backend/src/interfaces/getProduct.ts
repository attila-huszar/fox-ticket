import Product from '../models/Product';

export interface GetProductRequest {
  productId: number;
}
export interface GetProductResponse {
  product: Product;
}
