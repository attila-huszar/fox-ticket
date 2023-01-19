import Article from '../models/Article';
import { ArticleRequest } from '../interfaces/articles';

export function getAllArticles(): Promise<Article[]> {
  return Article.findAll();
}

export function createArticle(newArticle: ArticleRequest): Promise<Article> {
  return Article.create({ ...newArticle });
}

export function getArticleByTitle(articleTitle: string): Promise<Article | null> {
  return Article.findOne({ where: { title: articleTitle } });
}

export function editArticle(articleId: number, editArticle: ArticleRequest): Promise<number[]> {
  return Article.update({ ...editArticle }, { where: { id: articleId }});
}