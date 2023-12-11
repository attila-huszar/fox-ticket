import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import logger from 'pino-http';
import pino from './logger';
import apiRouter from './routes/api';
import staticRouter from './routes/static';

const app = express();

app.use(helmet());
app.use(compression());
app.use(logger({ pino }));

app.use('/api', apiRouter);
app.use(staticRouter);

export default app;
