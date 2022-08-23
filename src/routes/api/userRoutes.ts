import { Router } from 'express';
import {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  //  , getUsers, getUser, updateUser, deleteUser
} from '../../controllers/userControllers';
import { Login } from '../../controllers/authCOntrollers';
import protect from '../../middelware/authonticateMiddleware';
const routes = Router();

routes.route('/').post(createUser).get(protect, getUsers);
routes.route('/:id').get(protect, getSingleUser).put(protect, updateUser).delete(protect, deleteUser);

routes.route('/login').post(Login);
//.get(getUsers);

//routes.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

export default routes;
