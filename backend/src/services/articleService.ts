import Article from '../models/Article';
import * as articleRepo from '../repositories/articleRepo';
import {
  GetAllArticlesResponse,
  NewArticleRequest,
  NewArticleResponse,
} from '../interfaces/articles';
import { NotFoundError, ParameterError } from '../errors';

export async function getAllArticles(): Promise<GetAllArticlesResponse> {
  const allArticles: Article[] = await articleRepo.getAllArticles();
  return { articles: allArticles };
}

export async function addNewArticle(
  newArticle: NewArticleRequest
): Promise<NewArticleResponse> {
  if (!newArticle) {
    throw new ParameterError('Invalid article');
  }
  const article = await articleRepo.createArticle(newArticle);

  return { newArticle: article };
}
