import { Router } from 'express';
import {
  createUser,
  getUsers,
  //  , getUsers, getUser, updateUser, deleteUser
} from '../../controllers/userControllers';
import { Register } from '../../middelware/authMiddleware';
const routes = Router();

routes.route('/').post(createUser).get(getUsers);
routes.route('/regester').post(Register);
//.get(getUsers);

//routes.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

export default routes;
