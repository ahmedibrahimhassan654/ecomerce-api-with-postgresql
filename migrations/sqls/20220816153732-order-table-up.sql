-- create orders table 
CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  status VARCHAR(50) default 'active',
  user_id BIGINT REFERENCES users(id) NOT Null
);