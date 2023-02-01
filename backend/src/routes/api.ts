import status from 'http-status';
import * as authTestController from '../controllers/authTestController';
import * as refreshController from '../controllers/refreshController';
import * as userController from '../controllers/userController';
import * as articleController from '../controllers/articleController';
import * as productController from '../controllers/productController';
import * as cartController from '../controllers/cartController';
import * as orderController from '../controllers/orderController';
import * as emailVerificationController from '../controllers/emailVerificationController';

import { auth } from '../middlewares/auth';
import apiErrorHandler from '../middlewares/apiErrorHandler';
import { HttpError } from '../errors';

const express = require('express');
const router = express.Router();

router.use(express.json());

//// GET
router.get('/articles', articleController.getAllArticles);
router.get('/admin/products', productController.getProductById);
router.get('/products', productController.getAllProducts);
router.get('/product', productController.getProductById);
router.get('/purchases/:userId', orderController.getAllOrders);
router.get('/orders/:userId', orderController.getPendingOrders);
router.get('/mytickets/:userId', orderController.getActiveOrders);

//// POST
router.post('/authtest', auth, authTestController.authTest);
router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);
router.post('/verify', emailVerificationController.emailVerification);
router.post('/logout', auth, userController.logoutUser);
router.post('/refresh', refreshController.refresh);
router.post('/purchases', orderController.addNewOrder);
router.post('/admin/articles', articleController.addNewArticle);
router.post('/admin/products', productController.addNewProduct);

//// PUT
router.put('/admin/products/:productId', productController.editProductById);
router.put('/admin/articles/:articleId', articleController.editArticle);

//// PATCH
router.patch('/orders/:userId', orderController.changeOrderStatusByUserId);

//// DELETE
router.delete('/orders', cartController.removePendingOrderFromCart);
router.delete('/orders/:orderId', cartController.removeProductFromCart);
router.delete(
  '/admin/products/:productId',
  productController.deleteProductById
);

//// 404
router.use(
  '/*',
  (req: Request, res: Response, next: (arg0: HttpError) => any) =>
    next(new HttpError(status.NOT_FOUND))
);
router.use(apiErrorHandler);

export default router;
