import Joi from 'joi';
import { RequestValidateSchema } from '../types/request-validate-schema.type';

export const createBlogSchema: RequestValidateSchema = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    author: Joi.string().hex().length(24).required(),
  }),
};

export const getBlogSchema: RequestValidateSchema = {
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
};

export const updateBlogSchema: RequestValidateSchema = {
  body: Joi.object().keys({
    title: Joi.string(),
    content: Joi.string(),
    author: Joi.string().hex().length(24),
  }),
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
};
export const deleteBlogSchema: RequestValidateSchema = {
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
};
