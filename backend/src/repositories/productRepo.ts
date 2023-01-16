import { NewProductRequest } from '../interfaces/product';
import { EditProductRequest } from '../interfaces/product';
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

export function deleteProductById(productId: number): Promise<number> {
  return Product.destroy({ where: { id: productId } });
}

export function editProductById(productId: number, editProduct: EditProductRequest): Promise<number[]> {
  return Product.update({ ...editProduct }, { where: { id: productId }});
}

export function getProductByName(productName: string): Promise<Product | null> {
  return Product.findOne({ where: { name: productName } });
}
