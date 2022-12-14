/* eslint-disable camelcase  */
/* eslint-disable class-methods-use-this  */

import db from '../DB';
import User from '../dataTypes/userType';
import hashPassword from '../utils/hashPassword';
import bcrypt from 'bcrypt';
import config from '../config';
class UserModel {
  //create user
  async create(user: User): Promise<User> {
    try {
      //open connection to database
      const client = await db.connect();
      //run query
      const query =
        'INSERT INTO users (email, user_name, first_name, last_name, password) VALUES ($1, $2, $3, $4,$5) RETURNING id, email, user_name, first_name, last_name';
      const result = await client.query(query, [
        user.email,
        user.user_name,
        user.first_name,
        user.last_name,
        hashPassword(user.password),
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
      const query = 'SELECT id, email, first_name, last_name FROM users';
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
      const query = 'SELECT id, email, user_name,first_name, last_name FROM users WHERE id=( $1)';
      const result = await client.query(query, [id]);
      client.release();
      return result.rows[0];
    } catch (error) {
      console.log(Error);
      console.log('Error getting user');
      throw new Error(`Unable to get user: ${(error as Error).message}`);
    }
  }

  async updateUser(user: User): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `UPDATE users 
                  SET email=$1, first_name=$2, last_name=$3 
                  WHERE id=$4 
                  RETURNING id, email, first_name, last_name`;

      const result = await connection.query(sql, [user.email, user.first_name, user.last_name, user.id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not update user: ${user.first_name}, ${(error as Error).message}`);
    }
  }

  async deleteUser(id: string): Promise<User> {
    try {
      const client = await db.connect();
      const query = 'DELETE FROM users WHERE id = $1 RETURNING id,email, first_name, last_name';
      const result = await client.query(query, [id]);
      client.release();
      return result.rows[0];
    } catch (error) {
      console.log(error);
      console.log('Error deleting user');
      throw new Error(`Unable to delete user: ${(error as Error).message}`);
    }
  }

  async LoginUser(email: string, password: string): Promise<User | null> {
    try {
      const connection = await db.connect();
      const sql = 'SELECT password FROM users WHERE email=$1';
      const result = await connection.query(sql, [email]);
      if (result.rows.length) {
        const { password: hashPassword } = result.rows[0];
        const isPasswordValid = bcrypt.compareSync(`${password}${config.pepper}`, hashPassword);
        if (isPasswordValid) {
          const userInfo = await connection.query(
            'SELECT id, email, user_name,first_name, last_name FROM users WHERE email=($1)',
            [email]
          );
          return userInfo.rows[0];
        }
      }
      connection.release();
      return null;
    } catch (error) {
      throw new Error(`Unable to login: ${(error as Error).message}`);
    }
  }
}

export default UserModel;
