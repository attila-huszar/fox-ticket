import Article from '../models/Article';
import * as articleRepo from '../repositories/articleRepo';
import {
  GetAllArticlesResponse,
  NewArticleRequest,
  NewArticleRequestValidator,
  NewArticleResponse,
} from '../interfaces/articles';
import { ParameterError } from '../errors';
import _ from 'lodash';

const articleResponse = (article: object) => {
  return _.pick(article, ['id', 'title', 'content', 'publish_date']);
};

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
  await NewArticleRequestValidator.parseAsync(newArticle);
  const article = await articleRepo.createArticle(newArticle);

  return articleResponse(article) as NewArticleResponse;
}
