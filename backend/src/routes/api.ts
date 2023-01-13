import express from 'express';
import status from 'http-status';
import apiErrorHandler from '../middlewares/apiErrorHandler';
import * as helloController from '../controllers/helloController';
import * as articleController from '../controllers/articleController';
import * as productController from '../controllers/productController';
import { HttpError } from '../errors';

const router = express.Router();

router.use(express.json());

router.get('/hello', helloController.getHelloWorld);
router.get('/articles', articleController.getAllArticles);
router.post('/admin/articles', articleController.addNewArticle);
router.post('/admin/products', productController.addNewProduct);
router.get('/admin/products', productController.getProductById);
router.delete('/admin/products/:productId',productController.deleteProductById);
router.get('/product', productController.getProductById);
router.get('/products', productController.getAllProducts);
router.use('/*', (req, res, next) => next(new HttpError(status.NOT_FOUND)));
router.use(apiErrorHandler);

export default router;
