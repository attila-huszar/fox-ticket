import { Request, Response, NextFunction } from 'express'
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } from 'http-status'
import { ZodError } from 'zod'
import { HttpError, NotFoundError, ParameterError } from '../errors'
import { fromZodError } from 'zod-validation-error'
import {
  GetAllProductsResponse,
  ProductResponse,
  NewProductRequest,
  EditProductRequest,
  EditProductResponse,
} from '../interfaces/product'
import * as productService from '../services/productService'

export function addNewProduct(
  req: Request<unknown, unknown, NewProductRequest, unknown>,
  res: Response<ProductResponse>,
  next: NextFunction,
): void {
  const product = req.body

  productService
    .addNewProduct(product)
    .then((result) => res.send(result))
    .catch((error) => {
      if (error instanceof ZodError) {
        next(new HttpError(BAD_REQUEST, fromZodError(error).message))
      } else {
        next(new HttpError(INTERNAL_SERVER_ERROR))
      }
    })
}

export function getProductById(
  req: Request<unknown, unknown, unknown, { productId: string }>,
  res: Response<ProductResponse>,
  next: NextFunction,
): void {
  const productId = Number(req.query.productId)

  productService
    .getProductById(productId)
    .then((data) => res.send(data))
    .catch((error) => {
      if (error instanceof ParameterError) {
        next(new HttpError(BAD_REQUEST, error.message))
      } else if (error instanceof NotFoundError) {
        next(new HttpError(NOT_FOUND))
      } else {
        next(new HttpError(INTERNAL_SERVER_ERROR))
      }
    })
}

export function getAllProducts(
  req: Request,
  res: Response<GetAllProductsResponse>,
  next: NextFunction,
): void {
  productService
    .getAllProducts()
    .then((data) => res.send(data))
    .catch(() => {
      next(new HttpError(INTERNAL_SERVER_ERROR))
    })
}

export function deleteProductById(
  req: Request<{ productId: string }, unknown, unknown, unknown>,
  res: Response<void>,
  next: NextFunction,
): void {
  const productId = Number(req.params.productId)

  productService
    .deleteProductById(productId)
    .then((data) => res.send(data))
    .catch((error) => {
      if (error instanceof ParameterError) {
        next(new HttpError(BAD_REQUEST, error.message))
      } else if (error instanceof NotFoundError) {
        next(new HttpError(NOT_FOUND))
      } else {
        console.log(error)
        next(new HttpError(INTERNAL_SERVER_ERROR))
      }
    })
}

export function editProductById(
  req: Request<{ productId: string }, unknown, EditProductRequest, unknown>,
  res: Response<EditProductResponse>,
  next: NextFunction,
): void {
  const productId = Number(req.params.productId)
  const editProduct = req.body

  productService
    .editProductById(productId, editProduct)
    .then((data) => res.send(data))
    .catch((error) => {
      if (error instanceof ParameterError) {
        next(new HttpError(BAD_REQUEST, error.message))
      } else if (error instanceof ZodError) {
        next(new HttpError(BAD_REQUEST, fromZodError(error).message))
      } else if (error instanceof NotFoundError) {
        next(new HttpError(NOT_FOUND))
      } else {
        next(new HttpError(INTERNAL_SERVER_ERROR))
      }
    })
}
