import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import config from './config';
import db from './DB';
import routes from './routes';

const PORT = process.env.PORT || 3000;
// create an instance server
const app: Application = express();
// HTTP request logger middleware

// HTTP request logger middleware
app.use(morgan('dev'));
//add midelware for parsing json
app.use(express.json());
// add routing for / path
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World 🌍',
  });
});
// // add routing for /api path
app.use('/api', routes);
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: 'Ohh you are lost, read the API documentation to find your way back home 😂',
  });
});

db.connect().then((client) => {
  return client
    .query('SELECT NOW()')
    .then(() => {
      client.release();
      console.log(`Connected to DB DB_NAME: ${config.databasename}`);
    })
    .catch((err) => {
      client.release();
      console.error('DB Error', err.message);
    });
});

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT} in ${config.env} mode`);
});

export default app;
