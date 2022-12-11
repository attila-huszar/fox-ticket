import express from 'express';
import status from 'http-status';
import apiErrorHandler from '../middlewares/apiErrorHandler';
import * as helloController from '../controllers/helloController';

const router = express.Router();

router.use(express.json());

router.get('/hello', helloController.getHelloWorld);

router.use('/*', (req, res) => res.sendStatus(status.NOT_FOUND));
router.use(apiErrorHandler);

export default router;
