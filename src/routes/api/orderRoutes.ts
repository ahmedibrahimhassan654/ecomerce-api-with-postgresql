import { Router } from 'express';
import { createOrder, getAllOrders } from '../../controllers/orderController';

const routes = Router();

routes.route('/').post(createOrder).get(getAllOrders);
// routes.route('/:id').get(getSingleproduct).put(updateProduct).delete(deleteProduct);

//routes.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

export default routes;
