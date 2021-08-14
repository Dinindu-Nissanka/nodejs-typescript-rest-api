import { errorHandlerMiddleware } from './error-handler.middleware';
import loggerMiddleware from './logger.middleware';
import { validate } from './request-validator.middleware';
import { authenticate, authStrategy } from './auth.middleware';
import { authorize } from './authorize.middleware';

export {
  errorHandlerMiddleware,
  loggerMiddleware,
  validate,
  authStrategy,
  authenticate,
  authorize,
};
