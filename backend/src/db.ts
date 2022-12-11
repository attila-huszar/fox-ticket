import path from 'path';
import { Sequelize } from 'sequelize-typescript';
import logger from './logger';

const databaseUrl = process.env.NODE_ENV === 'test' ? 'sqlite:test.sqlite'
  : process.env.MYSQL_URL;

if (!databaseUrl) {
  throw new Error('Missing environment variable MYSQL_URL');
}

const db = new Sequelize(databaseUrl, {
  logging: (sql: string) => logger.debug(sql),
  models: [path.join(__dirname, 'models')],
});

db.authenticate();

export default db;
