import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import catchAsync from '../utilities/catchAsync';

const validataRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body.body,
      cookies: req.cookies,
    });

    next();
  });
};

export default validataRequest;