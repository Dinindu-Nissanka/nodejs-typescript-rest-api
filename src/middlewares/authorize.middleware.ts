import { Request, Response, NextFunction } from 'express';
import { AuthorizationFailedException } from '../exceptions';

export const authorize = (
  authorizedRoles: Array<string>
): ((req: Request, res: Response, next: NextFunction) => void) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (authorizedRoles.find((role) => role === req.user?.role)) {
      next();
    } else {
      next(
        new AuthorizationFailedException([
          `User is not authorized to perform ${req.baseUrl}`,
        ])
      );
    }
  };
};
