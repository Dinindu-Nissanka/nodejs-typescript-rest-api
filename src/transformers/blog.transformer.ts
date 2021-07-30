import { IBlogDB } from '../models/blog.model';
import { Blog } from '../types/blog.type';
import transformUser from './user.transformer';

const transform = (blog: IBlogDB): Blog => {
  return {
    id: blog._id,
    content: blog.content,
    title: blog.title,
    author: transformUser(blog.author),
  };
};

export default transform;
