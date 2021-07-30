import { Router } from 'express';
import {
  createUserHandler,
  getUserHandler,
} from '../controllers/user.controller';
import { validate } from '../middlewares';
import { createUserSchema, getUserSchema } from '../schemas/user.schema';

const userRouter = Router();

// Route to create a user
userRouter.post('/', validate(createUserSchema), createUserHandler);

//Route to fetch a user
userRouter.get('/:id', validate(getUserSchema), getUserHandler);

export default userRouter;
