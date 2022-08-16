import { NextFunction, Request, Response, Router } from 'express';

const userRoutes = Router();

userRoutes.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello from userRoutes');
});
export default userRoutes;
