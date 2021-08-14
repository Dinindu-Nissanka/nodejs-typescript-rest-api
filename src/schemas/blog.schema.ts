import Joi from 'joi';
import { RequestValidateSchema } from '../types/request-validate-schema.type';

export const createBlogSchema: RequestValidateSchema = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
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
