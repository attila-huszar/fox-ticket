import pino, { Level, LoggerOptions } from 'pino'
import pretty from 'pino-pretty'

const env = process.env.NODE_ENV

function getLogLevel(): Level {
  if (env === 'test') {
    return 'debug'
  }

  if (env === 'development' && process.env.LOG_LEVEL !== undefined) {
    return process.env.LOG_LEVEL as Level
  }

  return 'info'
}

const options: LoggerOptions = {
  level: getLogLevel(),
}

export const logger =
  env === 'test' || env === 'development'
    ? pino(options, pretty({ colorize: true, sync: env === 'test' }))
    : pino(options)
