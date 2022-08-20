import { Response, Request, NextFunction } from 'express';
import Error from '../utils/errorInterface';

const errorHandler = (error: Error, _req: Request, res: Response, next: NextFunction) => {
  const status = error.statusCode || 500;
  const message = error.message || 'Whoops!! something went wrong';
  res.status(status).json({ status: 'error', message });
  next();
};

export default errorHandler;
