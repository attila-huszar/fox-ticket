import express from 'express';
import compressionMiddleware from 'compression';
import helmetMiddleware from 'helmet';
import loggingMiddleware from 'pino-http';
import logger from './logger';
import apiRouter from './routes/api';
import staticRouter from './routes/static';
const path = require('path')

const app = express();

app.use(loggingMiddleware({ logger }));
app.use(compressionMiddleware());
app.use(helmetMiddleware());

app.use('/api', apiRouter);
app.use(staticRouter);

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

export default app;
