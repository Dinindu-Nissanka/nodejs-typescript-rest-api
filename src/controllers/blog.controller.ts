import { NextFunction, Request, Response } from 'express';
import {
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
} from '../services/blog.service';
import { Blog } from '../types/blog.type';

const DEFAULT_PAGINATION_PAGE = 1;
const DEFAULT_PAGINATION_SIZE = 10;

// Method to handle the blog creation
export const createBlogHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const blog: Blog = await createBlog(req.body);
    return res.status(201).send(blog);
  } catch (error) {
    next(error);
  }
};

// Method to handle blog fetching
export const getBlogHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const blog: Blog | null = await getBlog(req.params.id);

    if (blog) {
      return res.status(200).send(blog);
    }
    return res.status(404).send();
  } catch (error) {
    next(error);
  }
};

// Method to handle blog update
export const updateBlogHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const blog: Blog = await updateBlog(req.params.id, req.body);
    return res.status(200).send(blog);
  } catch (error) {
    next(error);
  }
};

// Method to handle blog deletion
export const deleteBlogHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    await deleteBlog(req.params.id);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Method to fetch all the blogs
export const getAllBlogsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const page =
      (req.query.page && parseInt(req.query.page.toString())) ||
      DEFAULT_PAGINATION_PAGE;
    const size =
      (req.query.size && parseInt(req.query.size.toString())) ||
      DEFAULT_PAGINATION_SIZE;

    const blogs: Array<Blog> = await getAllBlogs({ page, size });
    return res.status(200).send(blogs);
  } catch (error) {
    next(error);
  }
};
