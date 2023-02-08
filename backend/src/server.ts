import app from './app';
import db from './db';
import logger from './logger';

const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 4000;

app.listen(port, async () => {
  logger.info(`Server listening on http://${host}:${port}`);

  await db.sync({ alter: true });
  logger.info('DB has been initialized');
});
