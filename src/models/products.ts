// @ts-ignore
import Client from "../database";

export type Product ={
    id?: number; 
    productname: string ; 
    productprice: number;
    productcategory: string;
}

export class ProductStore {

    async create(p:Product) :Promise<Product> 
    {
        try {
            // @ts-ignore'
            const conn = await Client.connect();
            const sql =
              "INSERT INTO products (productname,productPrice,productcategory) VALUES($1, $2,$3) RETURNING *";
        
            ;
            const result = await conn.query(sql,[p.productname,p.productprice,p.productcategory]);
      
            const user = result.rows[0];
      
            conn.release();
      
            return user;
          } catch (err) {
            throw new Error(`Could not this new product ${p.productname}. Error: ${err}`);
          }
        
    }
    async index(): Promise<Product[]> {
        try {
          // @ts-ignore
          const conn = await Client.connect();
          const sql = "SELECT * FROM products";
    
          const result = await conn.query(sql);
    
          conn.release();
    
          return result.rows;
        } catch (err) {
          throw new Error(`Could not get produucts. Error: ${err}`);
        }
      }
      async show(id: string): Promise<Product> {
        try {
          const sql = "SELECT * FROM products WHERE id=($1)";
          // @ts-ignore
          const conn = await Client.connect();
    
          const result = await conn.query(sql, [id]);
    
          conn.release();
    
          return result.rows[0];
        } catch (err) {
          throw new Error(`Could not find this product ${id}. Error: ${err}`);
        }
      }
    
      async delete(id: string): Promise<Product> {
        try {
          const sql = "DELETE FROM products WHERE id=($1)";
          // @ts-ignore
          const conn = await Client.connect();
    
          const result = await conn.query(sql, [id]);
    
          const user = result.rows[0];
    
          conn.release();
    
          return user;
        } catch (err) {
          throw new Error(`Could not delete this product ${id}. Error: ${err}`);
        }
      }
}