import { NotFoundError, ParameterError } from '../errors';
import * as productRepo from '../repositories/productRepo';
import {
  GetAllProductsResponse,
  ProductResponse,
  NewProductRequest,
  NewProductRequestValidator,
} from '../interfaces/product';
import _ from 'lodash';

const productResponse = (productObject: object) => {
  return _.pick(productObject, [
    'id',
    'name',
    'price',
    'duration',
    'description',
    'type',
  ]);
};

export async function addNewProduct(
  newProduct: NewProductRequest
): Promise<ProductResponse> {
  await NewProductRequestValidator.parseAsync(newProduct);
  const product = await productRepo.createProduct(newProduct);

  if (product) {
    return productResponse(product) as ProductResponse;
  }
}

export async function getProductById(
  productId: number
): Promise<ProductResponse> {
  if (productId < 0 || !Number.isInteger(productId)) {
    throw new ParameterError('Invalid productId');
  }
  const product = await productRepo.getProductById(productId);

  if (product) {
    return productResponse(product) as ProductResponse;
  } else {
    throw new NotFoundError();
  }
}

export async function getAllProducts(): Promise<GetAllProductsResponse> {
  const products = await productRepo.getAllProducts();

  return { allProducts: products };
}

export async function deleteProductById(productId: number): Promise<void> {
  if (productId < 0 || !Number.isInteger(productId)) {
    throw new ParameterError('Invalid productId');
  }
  await productRepo.deleteProductById(productId);
}
