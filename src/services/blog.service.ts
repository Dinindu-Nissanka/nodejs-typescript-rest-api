import { AuthorizationFailedException, NotFoundException } from '../exceptions';
import BlogModel, { IBlogDB } from '../models/blog.model';
import UserModel from '../models/user.model';
import transform from '../transformers/blog.transformer';
import {
  Blog,
  BlogCreateInput,
  BlogUpdateInput,
  Pagination,
} from '../types/blog.type';

// Create a blog in the database convert the result to the Blog type and send it back to the controller
export const createBlog = async (blogInput: BlogCreateInput): Promise<Blog> => {
  const isAuthorExists = await UserModel.exists({ _id: blogInput.author });

  if (!isAuthorExists) {
    throw new NotFoundException(`User with id ${blogInput.author} not found`);
  }
  let blog: IBlogDB = await BlogModel.create(blogInput);
  blog = await blog.populate('author').execPopulate();
  return transform(blog);
};

// Fetch a blog from database convert it to the Blog type and send it back to the controller
export const getBlog = async (id: string): Promise<Blog | null> => {
  const blog: IBlogDB | null = await BlogModel.findById(id).populate('author');
  if (!blog) {
    return null;
  }
  return transform(blog);
};

// Update a blog from database convert it to the Blog type and send it back to the controller
export const updateBlog = async (
  id: string,
  blogUpdate: BlogUpdateInput,
  userId: string | undefined
): Promise<Blog> => {
  const blog: Blog | null = await getBlog(id);
  if (!blog) {
    throw new NotFoundException(`Blog with an id ${id} not found`);
  }
  if (blog.author.id !== userId) {
    throw new AuthorizationFailedException([
      `User is not authorized to perform update on the requested blog`,
    ]);
  }

  const updatedBlog: IBlogDB | null = await BlogModel.findByIdAndUpdate(
    id,
    blogUpdate,
    {
      new: true,
    }
  ).populate('author');
  if (!updatedBlog) {
    throw new NotFoundException(`Blog with an id ${id} not found`);
  }
  return transform(updatedBlog);
};

// Delete a blog from database convert
export const deleteBlog = async (
  id: string,
  userId: string | undefined
): Promise<boolean> => {
  const blog: Blog | null = await getBlog(id);
  if (!blog) {
    throw new NotFoundException(`Blog with an id ${id} not found`);
  }
  if (blog.author.id !== userId) {
    throw new AuthorizationFailedException([
      `User is not authorized to perform delete on the requested blog`,
    ]);
  }

  await BlogModel.findByIdAndDelete(id);
  return true;
};

// Fetch all the blogs from database convert it to the Blog type and send it back to the controller
export const getAllBlogs = async (
  pagination: Pagination
): Promise<Array<Blog>> => {
  const blogs: Array<IBlogDB> = await BlogModel.find()
    .limit(pagination.size)
    .skip((pagination.page - 1) * pagination.size)
    .populate('author');
  return blogs.map((blog) => transform(blog));
};
