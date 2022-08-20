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

export const getSingleproduct = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const product = await productModel.getproduct(req.params.id);
  if (!product) {
    const error: Error = new Error(`product with id ${req.params.id} not found`);

    return next(error);
  }
  res.status(200).json({
    success: true,
    data: { ...product },
  });
});

export const updateProduct = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.id) {
    throw new Error('you should send the product id in the request body to update the product');
  }
  const updatedProduct = await productModel.update(req.body);
  if (!updatedProduct) {
    const error: Error = new Error(`product with id ${req.params.id} not found`);

    return next(error);
  }
  res.status(200).json({
    success: true,
    data: { ...updatedProduct },
  });
});
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  const user = await productModel.delete(req.params.id);
  if (!user) {
    const error: Error = new Error(`product with id ${req.params.id} not found`);
    return next(error);
  }

  res.status(200).json({
    success: true,
    data: {},
  });
};
