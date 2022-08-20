import ProductModel from '../models/productModel';
import { Request, Response, NextFunction } from 'express';
//import Error from '../middelware/errorhandler';
import asyncHandler from 'express-async-handler';

const productModel = new ProductModel();

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await productModel.create(req.body);
  res.status(200).json({
    success: true,
    data: { ...product },
  });
});

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await productModel.getAllProducts();
  res.status(200).json({
    success: true,
    length: products.length,
    data: products,
  });
});

// export const getSingleUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//   const user = await userModel.getUser(req.params.id);
//   if (!user) {
//     const error: Error = new Error(`User with id ${req.params.id} not found`);

//     return next(error);
//   }
//   res.status(200).json({
//     success: true,
//     data: { ...user },
//   });
// });

// export const updateUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//   if (!req.body.id) {
//     throw new Error('you should send the user id in the request body to update the user');
//   }
//   const user = await userModel.updateUser(req.body);
//   if (!user) {
//     const error: Error = new Error(`User with id ${req.params.id} not found`);

//     return next(error);
//   }
//   res.status(200).json({
//     success: true,
//     data: user,
//   });
// });
// export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
//   const user = await userModel.deleteUser(req.params.id);
//   if (!user) {
//     const error: Error = new Error(`User with id ${req.params.id} not found`);
//     return next(error);
//   }

//   res.status(200).json({
//     success: true,
//     data: {},
//   });
// };
