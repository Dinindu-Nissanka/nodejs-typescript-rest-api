import Joi from 'joi';
import { ROLE } from '../constants/user-role';
import { RequestValidateSchema } from '../types/request-validate-schema.type';

export const loginUserSchema: RequestValidateSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

export const signUpUserSchema: RequestValidateSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().valid(ROLE.READER, ROLE.AUTHOR),
  }),
};
