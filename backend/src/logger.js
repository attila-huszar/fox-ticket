import { format, createLogger, transports } from 'winston';

const options = {
  file: {
    level: 'info',
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    json: true,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    format: format.combine(format.colorize(), format.simple()),
  },
};

const logger = createLogger({
  exitOnError: false,
  handleRejections: true,
  transports: [
    Object.assign(
      new transports.File({
        ...options.file,
        filename: 'logs/error.log',
        level: 'error',
      }),
      { handleRejections: true }
    ),
    new transports.File({
      ...options.file,
      filename: 'logs/app.log',
    }),
  ],
});

/* istanbul ignore next */
logger.stream = {
  write: message => logger.info(message),
};

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    Object.assign(new transports.Console(options.console), {
      handleRejections: true,
    })
  );
}

export default logger;
