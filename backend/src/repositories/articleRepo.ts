import Article from '../models/Article';
import {
  GetAllArticlesResponse,
  NewArticleRequest,
  NewArticleResponse,
} from '../interfaces/articles';

export function getAllArticles(): Promise<Article[]> {
  return Article.findAll();
}

export function createArticle(newArticle: NewArticleRequest): Promise<Article> {
  return Article.create({ ...newArticle });
}

export function getArticleByTitle(articleTitle: string): Promise<Article | null> {
  return Article.findOne({ where: { title: articleTitle } });
}