import { Router } from 'express';
import { createProduct, getProducts, getSingleproduct } from '../../controllers/productControllers';

const routes = Router();

routes.route('/').post(createProduct).get(getProducts);
routes.route('/:id').get(getSingleproduct);
//.put(protect, updateUser).delete(protect, deleteUser);

//routes.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

export default routes;
