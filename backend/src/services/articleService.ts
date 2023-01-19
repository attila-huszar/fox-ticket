import Article from '../models/Article';
import * as articleRepo from '../repositories/articleRepo';
import {
  GetAllArticlesResponse,
  ArticleRequest,
  ArticleRequestValidator,
  ArticleResponse,
} from '../interfaces/articles';
import { NotFoundError, ParameterError } from '../errors';
import _ from 'lodash';

const articleResponse = (article: object) => {
  return _.pick(article, ['id', 'title', 'content', 'publish_date']);
};

export async function getAllArticles(): Promise<GetAllArticlesResponse> {
  const allArticles: Article[] = await articleRepo.getAllArticles();
  return { articles: allArticles };
}

export async function addNewArticle(
  newArticle: ArticleRequest
): Promise<ArticleResponse> {
  if (!newArticle) {
    throw new ParameterError('Invalid article');
  }
  await ArticleRequestValidator.parseAsync(newArticle);
  const article = await articleRepo.createArticle(newArticle);

  return articleResponse(article) as ArticleResponse;
}

export async function editArticle(articleId: number, editArticle: ArticleRequest): Promise<ArticleResponse> {
  if (articleId < 0 || !Number.isInteger(articleId)) {
    throw new ParameterError('Invalid articleId');
  }
  await ArticleRequestValidator.parseAsync(editArticle)
  const affectedRows = await articleRepo.editArticle(articleId, editArticle);

  if (affectedRows[0] === 0) {
    throw new NotFoundError();
  } else {
   let editedArticle={ 
      id : articleId, 
      ...editArticle
    }
    return articleResponse(editedArticle) as ArticleResponse;
  }
}
