import Article from '../models/Article'
import { z } from 'zod'
import * as articleRepo from '../repositories/articleRepo'

export interface GetAllArticlesResponse {
  articles: Article[]
}

export interface ArticleResponse {
  article: Pick<Article, 'id' | 'title' | 'content' | 'publish_date'>
}

export const ArticleRequestValidator = z
  .object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    publish_date: z.date(),
  })
  .refine(async (articleRequest) => {
    const article = await articleRepo.getArticleByTitle(articleRequest.title)
    return !article
  }, 'Article title already exists')

export type ArticleRequest = z.infer<typeof ArticleRequestValidator>
