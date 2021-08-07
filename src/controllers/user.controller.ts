import { NextFunction, Request, Response } from 'express';
import { createUser, getUser } from '../services/user.service';
import { User } from '../types/user.type';

// Method to handle the user creation
export const createUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const user: User = await createUser(req.body);
    return res.status(201).send(user);
  } catch (error) {
    next(error);
  }
};

// Method to handle user fetching
export const getUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const user: User | null = await getUser(req.params.id);

    if (user) {
      return res.status(200).send(user);
    }
    return res.status(404).send();
  } catch (error) {
    next(error);
  }
};
