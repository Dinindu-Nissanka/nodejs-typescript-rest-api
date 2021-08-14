import { Router } from 'express';
import {
  createBlogHandler,
  getBlogHandler,
  updateBlogHandler,
  deleteBlogHandler,
  getAllBlogsHandler,
} from '../controllers/blog.controller';
import { authenticate, authorize, validate } from '../middlewares';
import {
  createBlogSchema,
  getBlogSchema,
  updateBlogSchema,
  deleteBlogSchema,
} from '../schemas/blog.schema';
import { ROLE } from '../constants/user-role';

const blogRouter = Router();

// Route to create a blog
blogRouter.post(
  '/',
  authenticate,
  authorize([ROLE.AUTHOR]),
  validate(createBlogSchema),
  createBlogHandler
);

//Route to fetch a blog
blogRouter.get('/:id', authenticate, validate(getBlogSchema), getBlogHandler);

//Route to update a blog
blogRouter.patch(
  '/:id',
  authenticate,
  authorize([ROLE.AUTHOR]),
  validate(updateBlogSchema),
  updateBlogHandler
);

//Route to delete a blog
blogRouter.delete(
  '/:id',
  authenticate,
  authorize([ROLE.AUTHOR]),
  validate(deleteBlogSchema),
  deleteBlogHandler
);

//Route to get all the blogs
blogRouter.get('/', authenticate, getAllBlogsHandler);

export default blogRouter;
