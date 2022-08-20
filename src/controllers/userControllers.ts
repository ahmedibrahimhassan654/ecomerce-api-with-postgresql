import UserModel from '../models/userModel';
import { Request, Response, NextFunction } from 'express';
//import Error from '../middelware/errorhandler';
import asyncHandler from 'express-async-handler';

const userModel = new UserModel();

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await userModel.create(req.body);
  res.status(200).json({
    success: true,
    data: { ...user },
  });
});

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await userModel.getAllUsers();
  res.status(200).json({
    success: true,
    length: users.length,
    data: users,
  });
});

export const getSingleUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const user = await userModel.getUser(req.params.id);
  if (!user) {
    const error: Error = new Error(`User with id ${req.params.id} not found`);

    return next(error);
  }
  res.status(200).json({
    success: true,
    data: { ...user },
  });
});

export const updateUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.id) {
    throw new Error('you should send the user id in the request body to update the user');
  }
  const user = await userModel.updateUser(req.body);
  if (!user) {
    const error: Error = new Error(`User with id ${req.params.id} not found`);

    return next(error);
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = await userModel.deleteUser(req.params.id);
  if (!user) {
    const error: Error = new Error(`User with id ${req.params.id} not found`);
    return next(error);
  }

  res.status(200).json({
    success: true,
    data: {},
  });
};
