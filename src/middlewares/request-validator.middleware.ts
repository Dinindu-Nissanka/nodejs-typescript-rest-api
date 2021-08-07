import { Request, Response, NextFunction } from 'express';
import { ValidationFailedException } from '../exceptions';
import { RequestValidateSchema } from '../types/request-validate-schema.type';
import Logger from '../utils/logger';

export const validate = (
  schema: RequestValidateSchema
): ((req: Request, res: Response, next: NextFunction) => void) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // validate request body
    if (schema.body) {
      const { error } = schema.body.validate(req.body);
      if (error) {
        const errors = error.details.map((detail) => detail.message);
        Logger.error(`Request body validation failed : ${errors}`);
        next(new ValidationFailedException(errors));
      }
    }

    // validate request url params
    if (schema.params) {
      const { error } = schema.params.validate(req.params);
      if (error) {
        const errors = error.details.map((detail) => detail.message);
        Logger.error(`Request url parameters validation failed : ${errors}`);
        next(new ValidationFailedException(errors));
      }
    }

    // validate request query params
    if (schema.query) {
      const { error } = schema.query.validate(req.query);
      if (error) {
        const errors = error.details.map((detail) => detail.message);
        Logger.error(`Request query parameters validation failed : ${errors}`);
        next(new ValidationFailedException(errors));
      }
    }

    next();
  };
};
