CREATE TABLE order_products (
id SERIAL PRIMARY KEY, 
 quantity integer,
orderID bigint REFERENCES orders(id) ,
productsID bigint REFERENCES products(id)


);