import { IUserDB } from '../models/user.model';
import { AuthUser, User } from '../types/user.type';

export const transform = (user: IUserDB): User => {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

export const transformAuthUser = (user: IUserDB, token: string): AuthUser => {
  return {
    id: user._id.toString(),
    token,
  };
};
