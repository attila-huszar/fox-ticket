import request from 'supertest';
import status from 'http-status';
import app from '../src/app';
import Article from '../src/models/Article';

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
