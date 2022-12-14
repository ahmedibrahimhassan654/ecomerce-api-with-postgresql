/* eslint-disable camelcase  */
/* eslint-disable class-methods-use-this  */

import db from '../DB';
import Product from '../dataTypes/productType';

// import config from '../config';
class productModel {
  //create user
  async create(product: Product): Promise<Product> {
    try {
      //open connection to database
      const client = await db.connect();
      //run query
      const query = 'INSERT INTO products (name, description, price, category) VALUES ($1, $2, $3, $4) RETURNING *';
      const result = await client.query(query, [product.name, product.description, product.price, product.category]);
      //close connection
      client.release();
      //return result
      return result.rows[0];
    } catch (error) {
      console.log(error);
      console.log('Error creating user');
      throw new Error(`Unable to create (${product.name}): ${(error as Error).message}`);
    }
  }
  //   //get all users
  async getAllProducts(): Promise<Product[]> {
    try {
      //open connection to database
      const client = await db.connect();
      //run query
      const query = 'SELECT * FROM products';
      const result = await client.query(query);
      //close connection
      client.release();
      //return result
      return result.rows;
    } catch (error) {
      console.log(error);
      console.log('Error getting all users');
      throw new Error(`Unable to get all prpducts: ${(error as Error).message}`);
    }
  }

  async getproduct(id: string): Promise<Product> {
    try {
      const client = await db.connect();
      const query = 'SELECT * FROM products WHERE id = $1';
      const result = await client.query(query, [id]);
      client.release(); //close connection
      return result.rows[0];
    } catch (error) {
      console.log(Error);
      console.log('Error getting product');
      throw new Error(`Unable to get product: ${(error as Error).message}`);
    }
  }

  async update(product: Product): Promise<Product> {
    try {
      const connection = await db.connect();
      const sql = `UPDATE products
                    SET name=$1, description=$2, price=$3, category=$4
                    WHERE id=$5
                    RETURNING *`;

      const result = await connection.query(sql, [
        product.name,
        product.description,
        product.price,
        product.category,
        product.id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not update product: ${product.name}, ${(error as Error).message}`);
    }
  }

  async delete(id: string): Promise<Product> {
    try {
      const client = await db.connect();
      const query = 'DELETE FROM products WHERE id = $1 RETURNING *';
      const result = await client.query(query, [id]);
      client.release();
      return result.rows[0];
    } catch (error) {
      console.log(error);
      console.log('Error deleting user');
      throw new Error(`Unable to delete product: ${(error as Error).message}`);
    }
  }
}

export default productModel;
