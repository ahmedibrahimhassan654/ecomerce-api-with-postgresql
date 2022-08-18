import { Router } from 'express';
import {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser
  //  , getUsers, getUser, updateUser, deleteUser
} from '../../controllers/userControllers';
import { Register } from '../../middelware/authMiddleware';
const routes = Router();

routes.route('/').post(createUser).get(getUsers);
routes.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);
routes.route('/regester').post(Register);
//.get(getUsers);

//routes.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

export default routes;
