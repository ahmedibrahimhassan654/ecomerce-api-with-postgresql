import { Response, Request } from 'express';
import Error from '../utils/errorInterface';

const errorHandler = (error: Error, _req: Request, res: Response) => {
  const status = error.status || 500;
  const message = error.message || 'Whoops!! something went wrong';
  res.status(status).json({ status: 'error', message });
};

export default errorHandler;
