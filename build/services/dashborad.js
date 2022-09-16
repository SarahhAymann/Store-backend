"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisClass = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class AnalysisClass {
    async Top5products() {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = " SELECT DISTINCT products.productName,order_products.productsID from products INNER JOIN order_products ON products.id = order_products.productsID LIMIT 5;";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`unable to get the top 5 products: ${err}`);
        }
    }
    async productsByCategoreies(productCategory) {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = " SELECT * from products WHERE products.productcategory=($1);";
            const result = await conn.query(sql, [productCategory]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`unable to get the products by category: ${err}`);
        }
    }
    async currentOrderByUser(user_id) {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = " SELECT* FROM orders WHERE orders.order_status='Active' AND orders.user_id=($1);";
            const result = await conn.query(sql, [user_id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`unable to get orders by this user${user_id}: ${err}`);
        }
    }
    async completedOrdersByuser(user_id) {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = " SELECT* FROM orders WHERE orders.order_status='Completed' AND orders.user_id=($1);";
            const result = await conn.query(sql, [user_id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`unable to get orders by this user${user_id}: ${err}`);
        }
    }
}
exports.AnalysisClass = AnalysisClass;
