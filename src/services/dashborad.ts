// @ts-ignore
import Client from "../database";
import {  } from "module";
import { Order,OrderStore } from "../models/orders";

export class AnalysisClass {
  async Top5products(): Promise<{ productName: string; productsID: number }[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql =
        " SELECT DISTINCT products.productName,order_products.productsID from products INNER JOIN order_products ON products.id = order_products.productsID LIMIT 5;";
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable to get the top 5 products: ${err}`);
    }
  }

  async productsByCategoreies(productCategory:string): Promise<{ productsnumber: number; productCategory: string }[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql =
        " SELECT * from products WHERE products.productcategory=($1);";
      const result = await conn.query(sql,[productCategory]);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable to get the products by category: ${err}`);
    }
  }

  async currentOrderByUser(user_id:string): Promise<Order[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql =
        " SELECT* FROM orders WHERE orders.order_status='Active' AND orders.user_id=($1);";
      const result = await conn.query(sql,[user_id]);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable to get orders by this user${user_id}: ${err}`);
    }
  }
  async completedOrdersByuser(user_id:number): Promise<{orderid:number,orderStatus:string ,userid:number}[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql =
        " SELECT* FROM orders WHERE orders.order_status='Completed' AND orders.user_id=($1);";
      const result = await conn.query(sql,[user_id]);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable to get orders by this user${user_id}: ${err}`);
    }
  }
}

