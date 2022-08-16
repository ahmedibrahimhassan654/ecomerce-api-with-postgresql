import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import config from './config';
import db from './DB';

const PORT = process.env.PORT || 3000;
// create an instance server
const app: Application = express();
// HTTP request logger middleware
app.use(morgan('short'));

// add routing for / path
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World 🌍',
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
