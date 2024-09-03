import { app } from './app'
import { db } from './db'
import { logger } from './logger'

const host = process.env.HOST ?? '127.0.0.1'
const port = process.env.PORT ?? 4000

app.listen(port, () => {
  logger.info(`Server listening on http://${host}:${port}`)

  db.sync({ alter: true })
    .then((dbInit) => {
      logger.info(
        `Database: ${dbInit.config.database} listening on ${dbInit.config.host}:${dbInit.config.port}`,
      )
    })
    .catch((err) => {
      logger.error(err)
    })
})
