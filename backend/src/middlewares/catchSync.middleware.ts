import { NextFunction, Request, Response } from 'express';

export const catchSync = (func: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      func(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
