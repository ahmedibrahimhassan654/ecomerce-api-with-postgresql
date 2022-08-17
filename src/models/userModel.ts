/* eslint-disable camelcase  */
/* eslint-disable class-methods-use-this  */

import db from '../DB';
import User from '../dataTypes/userType';
//import hashPassword from '../utils/hashPassword';

class UserModel {
  //create user
  async create(user: User): Promise<User> {
    try {
      //open connection to database
      const client = await db.connect();
      //run query
      const query =
        'INSERT INTO users (email, user_name, first_name, last_name, password) VALUES ($1, $2, $3, $4,$5) RETURNING *';
      const result = await client.query(query, [
        user.email,
        user.user_name,
        user.first_name,
        user.last_name,
        user.password,
      ]);
      //close connection
      client.release();
      //return result
      return result.rows[0];
    } catch (error) {
      console.log(error);
      console.log('Error creating user');
      throw new Error(`Unable to create (${user.user_name}): ${(error as Error).message}`);
    }
  }
  //get all users
  async getAllUsers(): Promise<User[]> {
    try {
      //open connection to database
      const client = await db.connect();
      //run query
      const query = 'SELECT * FROM users';
      const result = await client.query(query);
      //close connection
      client.release();
      //return result
      return result.rows;
    } catch (error) {
      console.log(error);
      console.log('Error getting all users');
      throw new Error(`Unable to get all users: ${(error as Error).message}`);
    }
  }

  async getUser(id: string): Promise<User> {
    try {
      const client = await db.connect();
      const query = 'SELECT * FROM users WHERE id = $1';
      const result = await client.query(query, [id]);
      client.release();
      return result.rows[0];
    } catch (error) {
      console.log(error);
      console.log('Error getting user');
      throw new Error(`Unable to get user: ${(error as Error).message}`);
    }
  }
}

export default UserModel;
