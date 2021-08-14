import { Request, Response, NextFunction } from 'express';
import passport, { PassportStatic } from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import {
  AuthenticationFailedException,
  NotFoundException,
} from '../exceptions';
import { getUser } from '../services/user.service';
import { User } from '../types/user.type';

// Passport strategy to authentication
export const authStrategy = (passport: PassportStatic): void => {
  const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  const secretOrKey: string = process.env.JWT_PRIVATE_KEY || 'privateKey';

  passport.use(
    new Strategy(
      {
        secretOrKey,
        jwtFromRequest,
      },
      async (token, done) => {
        try {
          const user: User | null = await getUser(token.id);
          if (!user) {
            return done(new NotFoundException(`User not found`));
          }
          return done(null, { ...user });
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export const authenticate = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  passport.authenticate('jwt', { session: false }, function (err, user) {
    if (err) return next(err);
    if (!user) throw new AuthenticationFailedException();
    request.user = user;
    next();
  })(request, response, next);
};

// export const authenticate = (
//   request: Request,
//   response: Response,
//   next: NextFunction
// ): ((req: Request, res: Response, next: NextFunction) => void) => {
//   return async (request: Request, res: Response, next: NextFunction) => {
//     console.log('Inside');
//     await passport.authenticate(
//       'jwt',
//       { session: false },
//       function (err, user) {
//         if (err) return next(err);
//         if (!user) throw new AuthenticationFailedException();
//         request.user = user;
//         next();
//       }
//     );
//   };
// };
