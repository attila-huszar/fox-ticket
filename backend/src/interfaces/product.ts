import Product from '../models/Product';

export interface GetAllProductsResponse {
  allProducts: Product[];
}

export interface ProductResponse {
  id: number;
  name: string;
  price: number;
  duration: number;
  description: string;
  type: string;
}

export interface NewProductRequest {
  id: number;
  name: string;
  price: number;
  duration: number;
  description: string;
  type: string;
}
