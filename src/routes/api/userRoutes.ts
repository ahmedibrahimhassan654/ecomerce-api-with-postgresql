import { Router } from 'express';
import { createUser
//  , getUsers, getUser, updateUser, deleteUser

} from '../../controllers/userControllers';
const routes = Router();

routes.route('/').post(createUser);
//.get(getUsers);

//routes.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

export default routes;
