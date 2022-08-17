import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import errorHandler from './middelware/errorhandler';
import routes from './routes/index';

const app = express();


// HTTP request logger middleware
app.use(morgan('dev'));
app.use(cors());
// HTTP security middleware headers
app.use(helmet());

// // add routing for /api path
app.use('/api', routes);

// error handler middleware
app.use(errorHandler);

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: 'Ohh you are lost, read the API documentation to find your way back home 😂',
  });
});
export default app;
