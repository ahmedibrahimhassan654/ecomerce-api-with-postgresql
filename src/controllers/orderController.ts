import OrderModel from '../models/orderModel';
import { Request, Response } from 'express';
//import Error from '../middelware/errorhandler';
import asyncHandler from 'express-async-handler';
const orderModel = new OrderModel();

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  // req.body.user_id = req.user.id;

  const order = await orderModel.create(req.body);
  res.status(200).json({
    success: true,
    data: { ...order },
  });
});
