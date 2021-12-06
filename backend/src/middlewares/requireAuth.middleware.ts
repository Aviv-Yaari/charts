import { RequestHandler } from 'express-serve-static-core';
import { ExpressError } from '../services/error.service';

export const requireAuth: RequestHandler = async (req, res, next) => {
  if (!req.session || !req.session.user) {
    next(new ExpressError('Not authenticated', 401));
  }
  next();
};
