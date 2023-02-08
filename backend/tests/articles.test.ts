import request from 'supertest';
import status from 'http-status';
import app from '../src/app';
import Article from '../src/models/Article';
import * as articleRepo from '../src/repositories/articleRepo';

describe('GET /api/articles', () => {
  it('returns all existing articles', async () => {
    await Article.create({
      title: 'Cím',
      content: 'tartalom',
      publish_date: String(Date.now()),
    });
    const result = await request(app).get(`/api/articles`);

    expect(result.statusCode).toEqual(status.OK);
    const { articles } = result.body;
    expect(articles.length).toEqual(1);
  });
});

describe('POST /api/admin/articles', () => {
  it('returns the JSON for the created article', async () => {
    const newArticle = {
      title: 'What is the future',
      content: 'Something about future of travel',
      publish_date: '2023-01-13T13:39:45.002Z',
    };

    const result = await request(app)
      .post(`/api/admin/articles`)
      .send(newArticle);

    expect(result.statusCode).toEqual(status.OK);
    const article = result.body;
    expect(article).toEqual({
      id: 1,
      title: 'What is the future',
      content: 'Something about future of travel',
      publish_date: '2023-01-13T13:39:45.002Z',
    });
    expect(articleRepo.getArticleByTitle('What is the future')).toBeTruthy();
  });

  it('returns Bad Request for missing parameter', async () => {
    const newArticle = {
      content: 'Something about future of travel',
    };

    const result = await request(app)
      .post('/api/admin/articles')
      .send(newArticle);
    expect(result.statusCode).toEqual(status.BAD_REQUEST);
  });

  it('should send an error back with a message of Article title already exists', async () => {
    const newArticle = {
      title: 'What is the future',
      content: 'Something about future of travel',
    };

    await articleRepo.createArticle({
      title: 'What is the future',
      content: 'Something about future of travel',
    });

    const result = await request(app)
      .post(`/api/admin/articles`)
      .send(newArticle);

    expect(result.statusCode).toEqual(status.BAD_REQUEST);
    const article = result.body;
    expect(article).toEqual({
      message: 'Validation error: Article title already exists',
    });
    expect(articleRepo.getArticleByTitle('What is the future')).toBeTruthy();
  });
});

describe('PUT /api/admin/articles/:articleId', () => {
  it('edit an existing article', async () => {
    await Article.create({
      title: 'What is the fuuuuture of travelling',
      content: 'Something future something about travel',
    });

    const editedArticle = {
      title: 'What is the future',
      content: 'Something about future of travel',
    };

    const result = await request(app)
      .put(`/api/admin/articles/1`)
      .send(editedArticle);
    expect(result.statusCode).toEqual(status.OK);

    const article = result.body;
    expect(article).toEqual({
      id: 1,
      title: 'What is the future',
      content: 'Something about future of travel',
    });
  });

  it('returns Bad Request for missing parameter', async () => {
    await Article.create({
      title: 'What is the fuuuuture of travelling',
      content: 'Something future something about travel',
    });

    const editedArticle = {
      content: 'Something about future of travel',
    };

    const result = await request(app)
      .put('/api/admin/articles/1')
      .send(editedArticle);
    expect(result.statusCode).toEqual(status.BAD_REQUEST);
  });

  it('Returns invalid articleId for wrong articleId', async () => {
    await Article.create({
      title: 'What is the fuuuuture of travelling',
      content: 'Something future something about travel',
    });

    const editedArticle = {
      title: 'What is the future',
      content: 'Something about future of travel',
    };

    const result = await request(app)
      .put('/api/admin/articles/asd')
      .send(editedArticle);
    expect(result.statusCode).toEqual(status.BAD_REQUEST);
  });
});
