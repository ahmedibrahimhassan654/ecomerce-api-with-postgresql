import UserModel from '../models/userModel';
import { Request, Response } from 'express';
import config from '../config';
//import Error from '../middelware/errorhandler';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
const userModel = new UserModel();

export const Register = asyncHandler(async (req: Request, res: Response) => {
  const user = await userModel.create(req.body);
  const token = jwt.sign({ user }, config.tokenSecret as unknown as string);
  res.status(200).json({
    success: true,
    data: { ...user, token },
  });
});
