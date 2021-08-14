import { User } from './user.type';

export type Blog = {
  title: string;
  content: string;
  author: User;
  id: string;
};

export type BlogCreateInput = {
  title: string;
  content: string;
  author: string;
};

export type BlogUpdateInput = {
  title?: string;
  content?: string;
};

export type Pagination = {
  size: number;
  page: number;
};
