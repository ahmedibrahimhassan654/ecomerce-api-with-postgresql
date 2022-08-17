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
  // async index(): Promise<User[]> {
  //   try {
  //     const connection = await db.connect();
  //     const sql = 'SELECT * FROM users';
  //     const result = await connection.query(sql);
  //     connection.release();
  //     return result.rows.map((u) => this.formatUser(u));
  //   } catch (err) {
  //     throw new Error('Error at retrieving users ');
  //   }
  // }

  // async edit(u: User): Promise<User> {
  //   try {
  //     const connection = await db.connect();
  //     const sql =
  //       'UPDATE users SET email=$1, user_name=$2, first_name=$3, last_name=$4, password=$5 WHERE id=$6 RETURNING *';

  //     const result = await connection.query(sql, [
  //       u.email,
  //       u.userName,
  //       u.first_name,
  //       u.lastName,
  //       hashPassword(u.password as string),
  //       u.id,
  //     ]);
  //     connection.release();
  //     return this.formatUser(result.rows[0]);
  //   } catch (err) {
  //     throw new Error(`Could not update user: ${u.userName}, `);
  //   }
  // }

  // async delete(id: number): Promise<User> {
  //   try {
  //     const connection = await db.connect();
  //     const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';

  //     const result = await connection.query(sql, [id]);

  //     connection.release();

  //     return this.formatUser(result.rows[0]);
  //   } catch (err) {
  //     throw new Error(`Could not delete user ${id}, `);
  //   }
  // }

  // async show(id: number): Promise<User> {
  //   try {
  //     const sql = 'SELECT * FROM users WHERE id=($1)';

  //     const connection = await db.connect();

  //     const result = await connection.query(sql, [id]);

  //     connection.release();
  //     return this.formatUser(result.rows[0]);
  //   } catch (err) {
  //     throw new Error(`Could not find user ${id}, `);
  //   }
  // }

  // async authenticate(userName: string, password: string): Promise<User | null> {
  //   try {
  //     const connection = await db.connect();
  //     const sql = 'SELECT password FROM users WHERE user_name=$1';
  //     const result = await connection.query(sql, [userName]);

  //     if (result.rows.length) {
  //       const { password: hashedPassword } = result.rows[0];
  //       const isPasswordValid = bcrypt.compareSync(`${password}${config.pepper}`, hashedPassword);
  //       if (isPasswordValid) {
  //         const userInfo = await connection.query('SELECT * FROM users WHERE user_name=($1)', [userName]);
  //         return this.formatUser(userInfo.rows[0]);
  //       }
  //     }
  //     connection.release();
  //     return null;
  //   } catch (error) {
  //     throw new Error('Unable to login:');
  //   }
  // }
}

export default UserModel;
