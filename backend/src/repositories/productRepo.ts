import { NewProductRequest } from '../interfaces/newProduct';
import Product from '../models/Product';

export function getProductById(id: number): Promise<Product | null> {
  return Product.findByPk(id);
}

export function createProduct(newProduct: NewProductRequest): Promise<Product> {
  return Product.create({ ...newProduct });
}

export function getAllProducts(): Promise<Product[] | null> {
  return Product.findAll();
}