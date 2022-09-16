"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const store = new orders_1.OrderStore();
const create = async (req, res) => {
    const order = {
        order_status: req.body.orderstatus,
        user_id: req.body.user_id,
    };
    try {
        const newOrder = await store.create(order);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err + order);
    }
};
const index = async (req, res) => {
    try {
        const order = await store.index();
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    const order = await store.show(req.params.id);
    res.json(order);
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
const addProductsToOrders = async (req, res) => {
    const orderID = req.params.id;
    const quantity = parseInt(req.body.quantity);
    const productsID = req.body.productsID;
    try {
        const addedProduct = await store.addProdtuctsToOrder(quantity, orderID, productsID);
        res.json(addedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const viewAllOrdersWithProducts = async (req, res) => {
    try {
        const orderID = req.params.id;
        const orderWithProducts = await store.ViewallOrders(orderID);
        res.json(orderWithProducts);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const showAnOrderWithProducts = async (req, res) => {
    const order = await store.showAnOrder(req.params.id);
    res.json(order);
};
const orders_routes = (app) => {
    app.get("/orders", index);
    app.get("/orders/:id", show);
    app.post("/orders", create);
    app.delete("/orders/:id", destroy);
    app.post("/orders/:id/products", addProductsToOrders);
    app.get("/orders/:id/products", viewAllOrdersWithProducts);
    app.get("/orders/:id/products/:id", showAnOrderWithProducts);
};
exports.default = orders_routes;
