import express from 'express';
import morgan from 'morgan';

import { api, system } from './routes';
import logger from './logger';
import errorHandler from './middlewares/error-handler';

const app = express();

app.use(morgan('combined', { stream: logger.stream }));

app.use('/api', api);
app.use('/system', system);

app.use(errorHandler);

export default app;
