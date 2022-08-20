import { Router } from 'express';
import { createProduct, getProducts } from '../../controllers/productControllers';

const routes = Router();

routes.route('/').post(createProduct).get(getProducts);
// routes.route('/:id').get(protect, getSingleUser).put(protect, updateUser).delete(protect, deleteUser);
// routes.route('/regester').post(Register);
// routes.route('/login').post(Login);
//.get(getUsers);

//routes.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

export default routes;
