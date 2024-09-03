import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import { pinoHttp } from 'pino-http'
import { logger } from './logger'
import apiRouter from './routes/api'
import staticRouter from './routes/static'

export const app = express()

app.use(helmet())
app.use(compression())
app.use(pinoHttp({ logger }))

app.use('/api', apiRouter)
app.use(staticRouter)
