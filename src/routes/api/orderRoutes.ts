import { Router } from 'express';
import { createOrder } from '../../controllers/orderController';

const routes = Router();

routes.route('/').post(createOrder);
// .get(getProducts);
// routes.route('/:id').get(getSingleproduct).put(updateProduct).delete(deleteProduct);

//routes.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

export default routes;
