import { NotFoundError, ParameterError } from '../errors';
import * as productRepo from '../repositories/productRepo';
import {
  NewProductRequest,
  NewProductResponse,
} from '../interfaces/newProduct';
import { GetAllProductsResponse } from '../interfaces/product';
import _ from 'lodash';
import { GetProductResponse } from '../interfaces/getProduct';

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
): Promise<NewProductResponse> {
  if (!newProduct) {
    throw new ParameterError('Invalid product');
  }
  const product = await productRepo.createProduct(newProduct);

  if (product) {
    return productResponse(product) as NewProductResponse;
  } else {
    throw new NotFoundError();
  }
}

export async function getProductById(
  productId: number
): Promise<GetProductResponse> {
  if (productId < 0 || !Number.isInteger(productId)) {
    throw new ParameterError('Invalid productId');
  }
  const product = await productRepo.getProductById(productId);

  if (product) {
    return productResponse(product) as GetProductResponse;
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
  const deletedProduct = await productRepo.getProductById(productId);

  if (!deletedProduct) {
    throw new NotFoundError();
  }
}
