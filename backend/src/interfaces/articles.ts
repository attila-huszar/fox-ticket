import Article from '../models/Article';
import { z } from 'zod';
import * as articleRepo from '../repositories/articleRepo';

export interface GetAllArticlesResponse {
  articles: Article[];
}

export interface ArticleResponse {
  article: Article;
}

export const ArticleRequestValidator = z
  .object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
  })
  .refine(async articleRequest => {
    const article = await articleRepo.getArticleByTitle(articleRequest.title);
    return !article;
  }, 'Article title already exists');

export type ArticleRequest = z.infer<typeof ArticleRequestValidator>;
