import Article from '../models/Article';
import { NewArticleRequest } from '../interfaces/newArticle';

export function getAllArticles(): Promise<Article[]> {
  return Article.findAll();
}

export function createArticle(newArticle: NewArticleRequest): Promise<Article> {
  console.log(newArticle);
  return Article.create({ ...newArticle });
}
