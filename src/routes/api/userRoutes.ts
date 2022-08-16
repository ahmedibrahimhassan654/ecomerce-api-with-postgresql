import { Request, Response, Router } from 'express';

const userRoutes = Router();

userRoutes.get('/', (req: Request, res: Response) => {
  res.send('Hello from userRoutes');
});
export default userRoutes;
