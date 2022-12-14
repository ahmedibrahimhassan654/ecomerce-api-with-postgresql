import { Router } from 'express';
import {
  createProduct,
  getProducts,
  getSingleproduct,
  updateProduct,
  deleteProduct,
} from '../../controllers/productControllers';

const routes = Router();

routes.route('/').post(createProduct).get(getProducts);
routes.route('/:id').get(getSingleproduct).put(updateProduct).delete(deleteProduct);

//routes.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

export default routes;
