import express from 'express';
import status from 'http-status';
import apiErrorHandler from '../middlewares/apiErrorHandler';
import * as helloController from '../controllers/helloController';
import * as articleController from '../controllers/articleController';
import * as productController from '../controllers/productController';
import * as userController from '../controllers/userController';
import * as cartController from '../controllers/cartController';
import { HttpError } from '../errors';

const router = express.Router();

router.use(express.json());

router.get('/hello', helloController.getHelloWorld);
router.get('/articles', articleController.getAllArticles);
router.post('/admin/articles', articleController.addNewArticle);
router.post('/admin/products', productController.addNewProduct);
router.get('/admin/products', productController.getProductById);
router.put('/admin/products/:productId', productController.editProductById);
router.delete('/admin/products/:productId', productController.deleteProductById);
router.get('/product', productController.getProductById);
router.get('/products', productController.getAllProducts);
router.post('/register', userController.registerUser);
router.delete('/orders/:orderId', cartController.removeProductFromCart);
router.delete('/orders', cartController.removePendingOrderFromCart);
router.use('/*', (req, res, next) => next(new HttpError(status.NOT_FOUND)));
router.use(apiErrorHandler);

export default router;
