import UserModel from '../models/userModel';
import { NextFunction, Request, Response } from 'express';
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

export const Login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.LoginUser(email, password);
    const token = jwt.sign({ user }, config.tokenSecret as unknown as string);
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'the username and password do not match please try again',
      });
    }
    return res.json({
      status: 'success',
      data: { ...user, token },
      message: 'user loged in  successfully',
    });
  } catch (err) {
    return next(err);
  }
};
