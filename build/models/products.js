"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class ProductStore {
    async create(p) {
        try {
            // @ts-ignore'
            const conn = await database_1.default.connect();
            const sql = "INSERT INTO products (productname,productPrice,productcategory) VALUES($1, $2,$3) RETURNING *";
            ;
            const result = await conn.query(sql, [p.productname, p.productprice, p.productcategory]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not this new product ${p.productname}. Error: ${err}`);
        }
    }
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM products";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get produucts. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = "SELECT * FROM products WHERE id=($1)";
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find this product ${id}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = "DELETE FROM products WHERE id=($1)";
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not delete this product ${id}. Error: ${err}`);
        }
    }
}
exports.ProductStore = ProductStore;
