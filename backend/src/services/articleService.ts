import { Article } from '../models/Article';
import * as articleRepo from '../repositories/articleRepo';
import { GetAllArticlesResponse } from '../interfaces/getArticles';
import { NewArticleRequest } from '../interfaces/newArticle';
import { NotFoundError, ParameterError } from '../errors';

export async function getAllArticles(): Promise<GetAllArticlesResponse> {
  const allArticles: Article[] = await articleRepo.getAllArticles();
  return { articles: allArticles };
}

export async function addNewArticle(
  newArticle: NewArticleRequest
): Promise<any> {
  if (!newArticle) {
    throw new ParameterError('Invalid article');
  }
  const article = await articleRepo.createArticle(newArticle);
  console.log(article)
  if (article) {
    return { newArticle: article };
  } else {
    throw new NotFoundError();
  }
}
