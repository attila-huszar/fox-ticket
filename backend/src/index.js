import logger from './logger';
import app from './app';
import config from './config';

const PORT = config.port || 8080;

app.listen(PORT, () => {
  logger.info(`App is listening on ${PORT}`);
});
