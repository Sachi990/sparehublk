// middlewares/errorHandler.js
const winston = require('winston');

// Configure Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

const errorHandler = (err, req, res, next) => {
  // Log the error
  logger.error(err.stack);

  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
};

module.exports = errorHandler;
