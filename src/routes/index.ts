import express from 'express';
import userRoutes from './api/userRoutes';
import productsRoutes from './api/productsRoutes';
import orderRoutes from './api/orderRoutes';

const routes = express.Router();
import protect from '../middelware/authonticateMiddleware';
routes.use('/users', userRoutes);
routes.use('/products', protect, productsRoutes);
routes.use('/orders', protect, orderRoutes);

export default routes;
