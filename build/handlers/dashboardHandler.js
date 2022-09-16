"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dashborad_1 = require("../services/dashborad");
const anaylsis = new dashborad_1.AnalysisClass();
const Top5products = async (_req, res) => {
    const products = await anaylsis.Top5products();
    res.json(products);
};
const productsBycategory = async (_req, res) => {
    const productCategory = _req.body.productcategory;
    const products = await anaylsis.productsByCategoreies(productCategory);
    res.json(products);
};
const currentOrderByuser = async (_req, res) => {
    try {
        const authorizationHeader = _req.headers.authorization;
        const token = authorizationHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json("Access denied, invalid token");
        return;
    }
    const user_id = _req.params.user_id;
    const orders = await anaylsis.currentOrderByUser(user_id);
    res.json(orders);
};
const completeOrderByuser = async (_req, res) => {
    try {
        const authorizationHeader = _req.headers.authorization;
        const token = authorizationHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json("Access denied, invalid token");
        return;
    }
    const user_id = parseInt(_req.params.user_id);
    const orders = await anaylsis.completedOrdersByuser(user_id);
    res.json(orders);
};
const anaylsisRoutes = (app) => {
    app.get("/Top5products", Top5products);
    app.get("/productsBycategory", productsBycategory);
    app.get("/currentOrderByuser/:user_id", currentOrderByuser);
    app.get("/completeOrderByuser/:user_id", completeOrderByuser);
};
exports.default = anaylsisRoutes;
