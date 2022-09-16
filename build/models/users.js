"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = process.env.SALT_ROUNDS;
const peper = process.env.BCRYPT_PASSWORD;
class UserStore {
    async create(u) {
        try {
            // @ts-ignore'
            const conn = await database_1.default.connect();
            const sql = "INSERT INTO users (firstname,lastname,username, passwordhashed) VALUES($1, $2,$3,$4) RETURNING *";
            const hash = bcrypt_1.default.hashSync(u.passwordhashed + peper, parseInt(saltRounds));
            const result = await conn.query(sql, [
                u.firstname,
                u.lastname,
                u.username,
                hash,
            ]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not add new user ${u.username}. Error: ${err}`);
        }
    }
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM users";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get users. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = "SELECT * FROM users WHERE id=($1)";
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            console.log(result);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find this user ${id}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = "DELETE FROM users WHERE id=($1)";
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not delete this user ${id}. Error: ${err}`);
        }
    }
}
exports.UserStore = UserStore;
