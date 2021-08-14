import jwt from 'jsonwebtoken';
import {
  AuthenticationFailedException,
  UserExistsException,
} from '../exceptions';
import UserModel, { IUserDB } from '../models/user.model';
import { transform, transformAuthUser } from '../transformers/user.transformer';
import {
  AuthUser,
  User,
  UserCreateInput,
  UserLoginInput,
} from '../types/user.type';

const ttl = process.env.JWT_TTL || 10000;
const jwtPrivateKey = process.env.JWT_PRIVATE_KEY || 'privateKey';

// Create a user in the database convert the result to the User type and send it back to the controller
export const createUser = async (userInput: UserCreateInput): Promise<User> => {
  const isUserExists = await UserModel.exists({ email: userInput.email });
  if (isUserExists) {
    throw new UserExistsException(userInput.email);
  }
  const user: IUserDB = await UserModel.create(userInput);
  return transform(user);
};

// Fetch a user from database convert it to the User type and send it back to the controller
export const getUser = async (id: string): Promise<User | null> => {
  const user: IUserDB | null = await UserModel.findById(id);
  if (!user) {
    return null;
  }
  return transform(user);
};

// Check the user login
// If the username and password matched then return a JWT token
export const login = async (loginInput: UserLoginInput): Promise<AuthUser> => {
  const { email, password } = loginInput;
  const user: IUserDB | null = await UserModel.findOne({ email });
  if (!user) {
    throw new AuthenticationFailedException(['Incorrect username or password']);
  }
  const isPasswordMatching = await user.comparePassword(password);
  if (!isPasswordMatching) {
    throw new AuthenticationFailedException(['Incorrect username or password']);
  }

  const token = jwt.sign({ id: user._id }, jwtPrivateKey, {
    expiresIn: ttl,
  });
  return transformAuthUser(user, token);
};

// Check the user sign up
// If the user creation is successful then return a JWT token
export const signUp = async (
  signUpInput: UserCreateInput
): Promise<AuthUser> => {
  const isUserExists = await UserModel.exists({ email: signUpInput.email });
  if (isUserExists) {
    throw new UserExistsException(signUpInput.email);
  }
  const user: IUserDB = await UserModel.create(signUpInput);
  const token = jwt.sign({ id: user._id }, jwtPrivateKey, {
    expiresIn: ttl,
  });
  return transformAuthUser(user, token);
};
