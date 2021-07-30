import { Router } from 'express';
import {
  createBlogHandler,
  getBlogHandler,
  updateBlogHandler,
  deleteBlogHandler,
  getAllBlogsHandler,
} from '../controllers/blog.controller';
import { validate } from '../middlewares';
import {
  createBlogSchema,
  getBlogSchema,
  updateBlogSchema,
  deleteBlogSchema,
} from '../schemas/blog.schema';

const blogRouter = Router();

// Route to create a blog
blogRouter.post('/', validate(createBlogSchema), createBlogHandler);

//Route to fetch a blog
blogRouter.get('/:id', validate(getBlogSchema), getBlogHandler);

//Route to update a blog
blogRouter.patch('/:id', validate(updateBlogSchema), updateBlogHandler);

//Route to delete a blog
blogRouter.delete('/:id', validate(deleteBlogSchema), deleteBlogHandler);

//Route to get all the blogs
blogRouter.get('/', getAllBlogsHandler);

export default blogRouter;
