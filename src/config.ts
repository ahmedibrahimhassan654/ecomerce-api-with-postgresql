import dotenv from 'dotenv';

dotenv.config();

const {
  PORT,
  NODE_ENV,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB_DEV,
  POSTGRES_DB_TEST,
  POSTGRES_DB_PROD,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = process.env;

export default {
  port: PORT,
  env: NODE_ENV,
  host: POSTGRES_HOST,
  dbPort: POSTGRES_PORT,
  databasename: NODE_ENV === 'dev' ? POSTGRES_DB_DEV : NODE_ENV === 'test' ? POSTGRES_DB_TEST : POSTGRES_DB_PROD,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
};
