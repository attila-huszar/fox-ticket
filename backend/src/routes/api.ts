import express from 'express'
import status from 'http-status'
import * as refreshController from '../controllers/refreshController'
import * as userController from '../controllers/userController'
import * as articleController from '../controllers/articleController'
import * as productController from '../controllers/productController'
import * as cartController from '../controllers/cartController'
import * as orderController from '../controllers/orderController'
import * as emailVerificationController from '../controllers/emailVerificationController'
import { HttpError } from '../errors'
import apiErrorHandler from '../middlewares/apiErrorHandler'

const router = express.Router()
router.use(express.json())

//// GET
router.get('/articles', articleController.getAllArticles)
router.get('/admin/products', productController.getProductById)
router.get('/products', productController.getAllProducts)
router.get('/product', productController.getProductById)
router.get('/purchases/:userId', orderController.getAllOrders)
router.get('/orders/:userId', orderController.getPendingOrders)
router.get('/tickets/:userId', orderController.getActiveOrders)

//// POST
router.post('/login', userController.loginUser)
router.post('/register', userController.registerUser)
router.post('/verify', emailVerificationController.emailVerification)
router.post('/logout', userController.logoutUser)
router.post('/refresh', refreshController.refresh)
router.post('/purchases', orderController.addNewOrder)
router.post('/admin/articles', articleController.addNewArticle)
router.post('/admin/products', productController.addNewProduct)

//// PUT
router.put('/admin/products/:productId', productController.editProductById)
router.put('/admin/articles/:articleId', articleController.editArticle)

//// PATCH
router.patch('/orders/:userId', orderController.changeOrderStatusByUserId)

//// DELETE
router.delete('/orders', cartController.removePendingOrderFromCart)
router.delete('/orders/:orderId', cartController.removeProductFromCart)
router.delete('/admin/products/:productId', productController.deleteProductById)

//// 404
router.use(
  '/*',
  (
    _req: express.Request,
    _res: express.Response,
    next: (arg0: HttpError) => unknown,
  ) => next(new HttpError(status.NOT_FOUND)),
)
router.use(apiErrorHandler)

export default router
