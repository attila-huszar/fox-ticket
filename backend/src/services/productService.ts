import { NotFoundError, ParameterError } from '../errors';
import * as productRepo from '../repositories/productRepo';
import {
  NewProductRequest,
  NewProductResponse,
} from '../interfaces/newProduct';

export async function addNewProduct(
  newProduct: NewProductRequest
): Promise<NewProductResponse> {
  if (!newProduct) {
    throw new ParameterError('Invalid product');
  }
  const product = await productRepo.createProduct(newProduct);

  if (product) {
    return { newProduct: product };
  } else {
    throw new NotFoundError();
  }
}

export async function getProductById(productId: number) {
  if (productId < 0 || !Number.isInteger(productId)) {
    throw new ParameterError('Invalid productId');
  }
  const product = await productRepo.getProductById(productId);

  if (product) {
    return { product };
  } else {
    throw new NotFoundError();
  }
}
