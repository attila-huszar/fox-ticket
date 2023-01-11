import Article from '../models/Article';
import {
  GetAllArticlesResponse,
  NewArticleRequest,
  NewArticleResponse,
} from '../interfaces/articles';

export function getAllArticles(): Promise<GetAllArticlesResponse> {
  return Article.findAll();
}

export function createArticle(
  newArticle: NewArticleRequest
): Promise<NewArticleResponse> {
  return Article.create({ ...newArticle });
}
