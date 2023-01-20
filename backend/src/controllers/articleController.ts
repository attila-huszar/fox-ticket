import { Request, Response, NextFunction } from 'express';
import status from 'http-status';
import { HttpError, NotFoundError, ParameterError } from '../errors';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';
import {
  GetAllArticlesResponse,
  ArticleRequest,
  ArticleResponse,
} from '../interfaces/articles';
import * as articleService from '../services/articleService';

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
  req: Request<unknown, unknown, ArticleRequest, unknown>,
  res: Response<ArticleResponse>,
  next: NextFunction
): Promise<void> {
  const article = req.body;

  try {
    const result = await articleService.addNewArticle(article);
    res.send(result);
  } catch (error) {
    if (error instanceof ParameterError) {
      next(new HttpError(status.BAD_REQUEST, error.message));
    } else if (error instanceof ZodError) {
      next(new HttpError(status.BAD_REQUEST, fromZodError(error).message));
    } else {
      next(new HttpError(status.INTERNAL_SERVER_ERROR));
    }
  }
}

export async function editArticle(
  req: Request<{ articleId: string }, unknown, ArticleRequest, unknown>,
  res: Response<ArticleResponse>,
  next: NextFunction
): Promise<void> {
  const articleId = Number(req.params.articleId);
  const editArticle = req.body;

  try {
    const data = await articleService.editArticle(articleId, editArticle);
    res.send(data);
  } catch (error) {
    if (error instanceof ParameterError) {
      next(new HttpError(status.BAD_REQUEST, error.message));
    } else if (error instanceof ZodError) {
      next(new HttpError(status.BAD_REQUEST, fromZodError(error).message));
    }else if (error instanceof NotFoundError) {
      next(new HttpError(status.NOT_FOUND));
    } else {
      next(new HttpError(status.INTERNAL_SERVER_ERROR));
    }
  }
}