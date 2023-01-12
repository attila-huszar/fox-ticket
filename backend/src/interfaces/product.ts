import Product from '../models/Product';
import * as productRepo from '../repositories/productRepo';
import { z } from 'zod';

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

export const NewProductRequestValidator = z
  .object({
    name: z.string().min(3, 'name must be at least 3'),
    price: z.number().positive(),
    duration: z.number().positive(),
    description: z.string(),
    type: z.enum(['pass', 'ticket']),
  })
  .refine(async productRequest => {
    const product = await productRepo.getProductByName(productRequest.name);
    return !product;
  }, 'Name already exists');

export type NewProductRequest = z.infer<typeof NewProductRequestValidator>;
