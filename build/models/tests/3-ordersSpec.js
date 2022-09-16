"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../orders");
const dashborad_1 = require("../../services/dashborad");
const analysis = new dashborad_1.AnalysisClass();
const store = new orders_1.OrderStore();
it("should contain order index method", () => {
    expect(store.index).toBeDefined();
});
it("should contain orders show method", () => {
    expect(store.show).toBeDefined();
});
it("should contain orders create method", () => {
    expect(store.create).toBeDefined();
});
it("create method should add a new order ", async () => {
    const result = await store.create({
        order_status: "active",
        user_id: "1"
    });
    expect(result).toEqual({
        id: 1,
        order_status: "active",
        user_id: "1"
    });
});
it("index method should return a list of orders", async () => {
    const result = await store.index();
    expect(result).toEqual([{
            id: 1,
            order_status: "active",
            user_id: "1"
        }]);
});
it("show method should return the correct order", async () => {
    const result = await store.show("1");
    expect(result).toEqual({
        id: 1,
        order_status: "active",
        user_id: "1"
    });
});
it("Should return the active orders by the user", async () => {
    const result = await analysis.currentOrderByUser("2");
    expect(result).toEqual([]);
});
it("create method should add a products to an order ", async () => {
    const quantity = 1;
    const orderID = "1";
    const productsID = '1';
    const result = await store.addProdtuctsToOrder(quantity, orderID, productsID);
    console.log(result);
    expect(result).toEqual({ id: 1,
        order_status: "active",
        user_id: "1"
    });
});
