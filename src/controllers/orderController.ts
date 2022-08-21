import OrderModel from '../models/orderModel';
import { Request, Response, NextFunction } from 'express';

//import Error from '../middelware/errorhandler';
import asyncHandler from 'express-async-handler';
import { getUserFromToken } from '../middelware/authonticateMiddleware';

const orderModel = new OrderModel();

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  // req.body.user_id = req.user.id;
  console.log(req.headers.authorization);
  const user = getUserFromToken(req.headers.authorization?.split(' ')[1] as string);
  //console.log('from create order', user[0]);
  // console.log(user);
  if (user !== null) {
    const order = await orderModel.create(req.body);
    res.status(200).json({
      success: true,
      data: { ...order },
    });
  }
});
export const getAllOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await orderModel.index();
  res.status(200).json({
    success: true,
    length: orders.length,
    data: { orders },
  });
});
export const getSinglOrder = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const order = await orderModel.show(req.params.id);
  if (!order) {
    const error: Error = new Error(`order with id ${req.params.id} not found`);

    return next(error);
  }
  res.status(200).json({
    success: true,
    data: { ...order },
  });
});
