import { Request, Response, NextFunction } from 'express';
import config from '../config';
import jwt from 'jsonwebtoken';

import asyncHandler from 'express-async-handler';
import handleUthontication from '../utils/handleAuth';
//import User from '../dataTypes/userType';

const protect = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
  try {
    // get authHeader
    const authHeader = req.get('Authorization');
    if (authHeader) {
      const bearer = authHeader.split(' ')[0].toLowerCase();
      const token = authHeader.split(' ')[1];
      if (token && bearer === 'bearer') {
        const decode = jwt.verify(token, config.tokenSecret as unknown as string);
        if (decode) {
          next();
        } else {
          // failed to authenticate user
          handleUthontication(next);
        }
      } else {
        // token type not bearer
        handleUthontication(next);
      }
    } else {
      // no token provided
      handleUthontication(next);
    }
  } catch (error) {
    handleUthontication(next);
  }
});
export const getUserFromToken = (token: string) => {
  const decode = jwt.verify(token, config.tokenSecret as unknown as string);
  return decode;
};

export default protect;
