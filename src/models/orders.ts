// @ts-ignore
import Client from "../database";

export type Order = {
  id?: number;
  order_status: string;
  user_id: string;
};


export type ProductsodOrder = {
  quantity: number,
  orderID: string,
  productsID: string
};



export class OrderStore {
  async create(o: Order): Promise<Order> {
    try {
      // @ts-ignore'
      const conn = await Client.connect();
      const sql =
        "INSERT INTO orders (order_status,user_id) VALUES($1, $2) RETURNING *";

      const result = await conn.query(sql, [o.order_status, o.user_id]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not this new order ${o.user_id}. Error: ${err}`);
    }
  }
  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }
  async show(id: string): Promise<Order> {
    try {
      const sql = "SELECT * FROM orders WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find this order ${id}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const sql = "DELETE FROM orders WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not delete this order ${id}. Error: ${err}`);
    }
  }
  async addProdtuctsToOrder(
quantity:number, orderID :string , productsID:string  ): Promise<Order>  {
    try {
      const sql =
        "INSERT INTO order_products (quantity ,orderID,productsID) VALUES ($1,$2,$3)";

      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [quantity, orderID,productsID]);
      const orders = result.rows[0];
      conn.release();
      return orders;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async ViewallOrders(orderID :string):Promise<Order>  {
    try {
      const sql = "SELECT * FROM order_products WHERE orderID=($1)";
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql,[orderID]);
      const orders = result.rows;
      conn.release();
      return orders;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }
  async showAnOrder(id: string): Promise<Order>  {
    try {
      const sql = "SELECT * FROM order_products WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find this order ${id}. Error: ${err}`);
    }
  }
}
