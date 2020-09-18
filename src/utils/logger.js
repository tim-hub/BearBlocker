require('dotenv').config();
const logger = require('pino')(
    {
      level: !process.env.LOG_LEVEL ? 'info' : process.env.LOG_LEVEL,
      prettyPrint: true,
    },
);
logger.debug('Log level is ' + process.env.LOG_LEVEL);

module.exports = {logger: logger};
