import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import errorHandler from './middelware/errorhandler';
import routes from './routes';
const app: Application = express();
app.use(express.json());
// HTTP request logger middleware
app.use(morgan('dev'));
app.use(cors());
// HTTP security middleware headers
app.use(helmet());

// // add routing for /api path
app.use('/api', routes);
// error handler middleware
app.use(errorHandler);
export default app;
