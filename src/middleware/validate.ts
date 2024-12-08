import type { Request, Response, NextFunction } from 'express';
import type { AnyZodObject } from 'zod';
import { AppError } from '../utils/appError';

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      return next(new AppError('Validation error', 400));
    }
  };