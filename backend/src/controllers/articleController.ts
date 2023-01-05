import { Request, Response, NextFunction } from 'express';
import status from 'http-status';
import { HttpError, NotFoundError, ParameterError } from '../errors';
import { GetAllArticlesResponse } from '../interfaces/getArticles';
import * as articleService from '../services/articleService';
import {
  NewArticleRequest,
  NewArticleResponse,
} from '../interfaces/newArticle';

export async function getAllArticles(
  req: Request,
  res: Response<GetAllArticlesResponse>,
  next: NextFunction
): Promise<void> {
  try {
    const data = await articleService.getAllArticles();
    res.send(data);
  } catch (error) {
    next(new HttpError(status.INTERNAL_SERVER_ERROR));
  }
}

export async function addNewArticle(
  req: Request<unknown, unknown, NewArticleRequest, unknown>,
  res: Response<NewArticleResponse>,
  next: NextFunction
): Promise<void> {
  const article = req.body;

  try {
    const result = await articleService.addNewArticle(article);
    res.send(result);
  } catch (error) {
    if (error instanceof ParameterError) {
      next(new HttpError(status.BAD_REQUEST, error.message));
    } else if (error instanceof NotFoundError) {
      next(new HttpError(status.NOT_FOUND));
    } else {
      next(new HttpError(status.INTERNAL_SERVER_ERROR));
    }
  }
}
