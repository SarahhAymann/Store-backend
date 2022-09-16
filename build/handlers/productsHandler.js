"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const products_1 = require("../models/products");
const store = new products_1.ProductStore();
const create = async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json("Access denied, invalid token");
        return;
    }
    const product = {
        productname: req.body.productname,
        productprice: req.body.productprice,
        productcategory: req.body.productcategory,
    };
    try {
        const newProduct = await store.create(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err + product);
    }
};
const index = async (req, res) => {
    try {
        const product = await store.index();
        res.json(product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    const product = await store.show(req.params.id);
    res.json(product);
};
const destroy = async (req, res) => {
    try {
        const deleted = await store.delete(req.params.id);
        res.json("Deleted sucessfully");
    }
    catch (error) {
        res.status(400);
        res.json({ error });
    }
};
const products_routes = (app) => {
    app.get("/products", index);
    app.get("/products/:id", show);
    app.post("/products", create);
    app.delete("/products/:id", destroy);
};
exports.default = products_routes;
