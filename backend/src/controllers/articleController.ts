import { Request, Response, NextFunction } from 'express'
import status from 'http-status'
import { HttpError, NotFoundError, ParameterError } from '../errors'
import { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'
import {
  GetAllArticlesResponse,
  ArticleRequest,
  ArticleResponse,
} from '../interfaces/articles'
import * as articleService from '../services/articleService'

export function getAllArticles(
  _req: Request,
  res: Response<GetAllArticlesResponse>,
  next: NextFunction,
) {
  articleService
    .getAllArticles()
    .then((data) => res.send(data))
    .catch(() => next(new HttpError(status.INTERNAL_SERVER_ERROR)))
}

export function addNewArticle(
  req: Request<unknown, unknown, ArticleRequest, unknown>,
  res: Response<ArticleResponse>,
  next: NextFunction,
) {
  const article = req.body

  articleService
    .addNewArticle(article)
    .then((result) => res.send(result))
    .catch((error) => {
      if (error instanceof ParameterError) {
        next(new HttpError(status.BAD_REQUEST, error.message))
      } else if (error instanceof ZodError) {
        next(new HttpError(status.BAD_REQUEST, fromZodError(error).message))
      } else {
        next(new HttpError(status.INTERNAL_SERVER_ERROR))
      }
    })
}

export async function editArticle(
  req: Request<{ articleId: string }, unknown, ArticleRequest, unknown>,
  res: Response<ArticleResponse>,
  next: NextFunction,
): Promise<void> {
  const articleId = Number(req.params.articleId)
  const editArticle = req.body

  try {
    const data = await articleService.editArticle(articleId, editArticle)
    res.send(data)
  } catch (error) {
    if (error instanceof ParameterError) {
      next(new HttpError(status.BAD_REQUEST, error.message))
    } else if (error instanceof ZodError) {
      next(new HttpError(status.BAD_REQUEST, fromZodError(error).message))
    } else if (error instanceof NotFoundError) {
      next(new HttpError(status.NOT_FOUND))
    } else {
      next(new HttpError(status.INTERNAL_SERVER_ERROR))
    }
  }
}
