import db from '../DB';
import Order from '../dataTypes/orderType';
// import Error from '../utils/errorInterface';
import OrderProduct from '../dataTypes/orderProductType';
import User from '../dataTypes/userType';

class OrderModel {
  //ORDER SCHEMA

  async create(order: Order): Promise<Order> {
    try {
      //open connection to database
      const client = await db.connect();

      const query = 'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *';
      //run query

      // const userquery = 'SELECT id, email, first_name, last_name FROM users WHERE id = $1';
      // const result = await client.query(userquery, [id]);
      //const userquery = 'select * from users where id = $2';
      const result = await client.query(query, [order.status, order.user_id]);
      //close connection
      client.release();
      // return order
      return result.rows[0];
    } catch (error) {
      console.log(error);
      console.log('Error creating user');
      throw new Error(`Unable to create (${order.id}): ${(error as Error).message}`);
    }
  }
}

export default OrderModel;
