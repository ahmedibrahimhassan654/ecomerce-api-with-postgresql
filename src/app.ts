import express from 'express';

import cors from 'cors';
import helmet from 'helmet';
import errorHandler from './middelware/errorhandler';
import routes from './routes/index';

const app = express();


app.use(cors());
// HTTP security middleware headers
app.use(helmet());

// // add routing for /api path
app.use('/api', routes);

// error handler middleware
app.use(errorHandler);

export default app;
