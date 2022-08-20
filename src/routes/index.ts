import express from 'express';
import userRoutes from './api/userRoutes';
import productsRoutes from './api/productsRoutes';
const routes = express.Router();
import protect from '../middelware/authonticateMiddleware';
routes.use('/users', userRoutes);
routes.use('/products', protect, productsRoutes);

export default routes;
