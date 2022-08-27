# Storefront Backend Project

**_Table of Contents_**

- [Storefront Backend Project](#storefront-backend-project)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installing](#installing)
    - [Setup environment](#setup-environment)
  - [Running the application](#running-the-application)
  - [Running the unit tests](#running-the-unit-tests)
  - [Built With](#built-with)
  - [Authors](#authors)
  - [License](#license)
  - [Acknowledgments](#acknowledgments)
  - [Endpoints](#endpoints)
  - [Database Schema](#database-schema)

A StoreFront backend API written in NodeJS for Udacity. This application has APIs for Users, Products, and Orders.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing
purposes.

### Prerequisites

You need the following modules and dependencies installed to run this project:

```bash
postgres SQL     #relation database
node 12          # To run the application
npm             # For dependency management
```

### Installing

Simply, run the following command to install the project dependencies:

```bash
npm install
```

### Setup environment

First, create a `.env` file with all the required environment variables:

```bash
# .env
NODE_ENV=dev
PORT=4000
# Set your database connection information here
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=Allahonly1
POSTGRES_DB_DEV=ecom_dev
POSTGRES_DB_TEST=ecom_test
POSTGRES_DB_PROD=ecom_prod
# user

SALT_ROUNDS=10
TOKEN_SECRET=supersecret
```

Next, start the Postgres migration:

```bash
npm run migration
```

Now, check if Postgres has the database `ecom_dev`, if not create it:

```bash
# Login to Postgres
psql -U postgres

# Postgres shell
# This will list out all the databases
\l

# If "ecom_dev" database is not present
create database ecom_dev;
```

Next, you need to run the database migrations:

```bash
npm run migration
```

## Running the application

Use the following command to run the application in watch mode:

```bash
npm run dev
```

Use the following command to run the application in using node:

```bash
npm run start
```

The application will run on <http://localhost:4000/api>.

## Running the unit tests

Use the following command to run the unit tests:

```bash
npm run test
```

You may also use the [Postman collection](https://www.postman.com/lunar-astronaut-197297/workspace/store-backend-udacity) present in the repository for testing.

## Built With

- [NodeJS](https://nodejs.org/) - The JavaScript runtime

- [db-migrate](https://db-migrate.readthedocs.io/en/latest/) - The database migration tool
- [Express](https://expressjs.com) - The web framework
- [TypeScript](https://www.typescriptlang.org/) - Types JS extension
- [Jasmine](https://jasmine.github.io/) - The unit testing framework

## Authors

```javascript
const life: Ahmed Ibrahim = {
  greet: "Hi 👋, I'm Ahmed Ibrahim Udacity nano degree student ",
  bio: 'A passionate engineer love cooding . from Egypt',
  currentlyLearning: 'advanced full stack udacity nano degree',
  askMeAbout: 'node js backend +react js +next js ',
  reachMeAt: 'ahmedibrahimhassan654@gmail.com',
  funFact: 'love writing code from my deep heart ',
};
```

[![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ahmed-ibrahim5588/)

## License

## Acknowledgments

- The official documentation of `db-migrate`
- The official Documentation of `Jasmine`

## Endpoints

- See [REQUIREMENTS.md](./REQUIREMENTS.md) file

## Database Schema

- See [REQUIREMENTS.md](./REQUIREMENTS.md) file
