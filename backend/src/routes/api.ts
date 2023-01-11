import express from 'express';
import status from 'http-status';
import apiErrorHandler from '../middlewares/apiErrorHandler';
import * as helloController from '../controllers/helloController';
import * as productController from '../controllers/productController';
import { HttpError } from '../errors';
import * as orderController from '../controllers/orderController';

const router = express.Router();

router.use(express.json());

router.get('/hello', helloController.getHelloWorld);
router.post('/admin/products', productController.addNewProduct);
router.get('/admin/products', productController.getProductById);
router.delete(
  '/admin/products/:productId',
  productController.deleteProductById
);
router.get('/product', productController.getProductById);
router.get('/products', productController.getAllProducts);
router.get('/purchases/:userId', orderController.getAllOrders);
router.post('/purchases', orderController.addNewOrder);
router.use('/*', (req, res, next) => next(new HttpError(status.NOT_FOUND)));
router.use(apiErrorHandler);

export default router;
