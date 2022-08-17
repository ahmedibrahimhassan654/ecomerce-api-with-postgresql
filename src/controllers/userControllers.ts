import UserModel from '../models/userModel';
import { NextFunction, Request, Response } from 'express';
//import Error from '../middelware/errorhandler';
import asyncHandler from 'express-async-handler';

const userModel = new UserModel();

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  console.log(req.body);

  const user = await userModel.create(req.body);
  res.status(200).json({
    success: true,
    data: { ...user },
  });
});
