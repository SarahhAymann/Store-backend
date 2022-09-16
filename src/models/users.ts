// @ts-ignore
import Client from "../database";
import bcrypt from "bcrypt";
const saltRounds = process.env.SALT_ROUNDS as unknown as string;
const peper = process.env.BCRYPT_PASSWORD;

export type User = {
  id?: number;
  firstname?: string;
  lastname?: string;
  username: string;
  passwordhashed: string;
};

export class UserStore {
  async create(u: User): Promise<User> {
    try {
      // @ts-ignore'
      const conn = await Client.connect();
      const sql =
        "INSERT INTO users (firstname,lastname,username, passwordhashed) VALUES($1, $2,$3,$4) RETURNING *";
        const hash = bcrypt.hashSync(
          u.passwordhashed + peper,
          parseInt(saltRounds as string)
        );
      const result = await conn.query(sql, [
        u.firstname,
        u.lastname,
        u.username,
        hash,
      ]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not add new user ${u.username}. Error: ${err}`);
    }
  }
  async index(): Promise<User[]> {
    
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM users";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }
  async show(id: string): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);
      console.log(result);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find this user ${id}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const sql = "DELETE FROM users WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not delete this user ${id}. Error: ${err}`);
    }
  }

  
}
