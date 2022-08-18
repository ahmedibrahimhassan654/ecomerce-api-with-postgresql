import Error from '../utils/errorInterface';
import { NextFunction } from 'express';
const handleUthontication = (next: NextFunction) => {
  const error: Error = new Error('you should login to access this route');

  next(error);
};

export default handleUthontication;
