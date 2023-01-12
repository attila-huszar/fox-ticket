import Product from '../models/Product';
import { z } from 'zod';
import * as productRepo from '../repositories/productRepo'

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

export interface EditProductResponse {
  id: number;
  name: string;
  price: number;
  duration: number;
  description: string;
  type: string;
}

export const EditProductRequestValidator = z
  .object({
    name: z.string().min(1, 'name is required'),
    price: z.number().min(1, 'price is required'),
    duration: z.number().min(1, 'duration is required'),
    description: z.string().min(1, 'description is required'),
    type: z.enum(["pass", "ticket"]),
  })
  .refine(async EditProductRequest => {
    const name = await productRepo.getProductByName(EditProductRequest.name);
    return !name;
  }, 'Product name already exists');

export type EditProductRequest = z.infer<typeof EditProductRequestValidator>;
