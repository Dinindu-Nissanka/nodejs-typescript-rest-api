import { NextFunction, Request, Response } from 'express';
import { login, signUp } from '../services/user.service';
import { AuthUser } from '../types/user.type';

// Method to handle the user login
export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const user: AuthUser = await login(req.body);
    return res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

// Method to handle user sign up
export const signUpHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const user: AuthUser = await signUp(req.body);
    return res.status(201).send(user);
  } catch (error) {
    next(error);
  }
};
