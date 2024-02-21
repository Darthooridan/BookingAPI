import logger from "../utils/log.js";

const logMiddleware = (req, res, next) => {
  const start = new Date();

  next();

  const ms = new Date() - start;
  logger.info(
    `METHOD: ${req.method}, URL: ${req.originalUrl}, STATUS: ${res.statusCode}, DURATION: ${ms} ms`
  );
  console.log(`Request duration: ${ms} ms`);
};

export default logMiddleware;