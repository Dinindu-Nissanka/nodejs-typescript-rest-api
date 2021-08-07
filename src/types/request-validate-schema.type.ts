import { ObjectSchema } from 'joi';

export type RequestValidateSchema = {
  body?: ObjectSchema;
  params?: ObjectSchema;
  query?: ObjectSchema;
};
