import { Router } from 'express';
import { createOrder, getAllOrders, getSinglOrder, addProduct } from '../../controllers/orderController';

const routes = Router();

routes.route('/').post(createOrder).get(getAllOrders);
routes.route('/:id').get(getSinglOrder);
routes.route('/:id/products').post(addProduct);
//.put(updateProduct).delete(deleteProduct);

//routes.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

export default routes;
