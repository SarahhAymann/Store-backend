"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../users");
const saltRounds = process.env.SALT_ROUNDS;
const peper = process.env.BCRYPT_PASSWORD;
const store = new users_1.UserStore();
it("should contain user index method", () => {
    expect(store.index).toBeDefined();
});
it("should contain user show method", () => {
    expect(store.show).toBeDefined();
});
it("should contain user create method", () => {
    expect(store.create).toBeDefined();
});
it("create method should add a new user ", async () => {
    const result = await store.create({
        firstname: "Sarah",
        lastname: "Ayman",
        username: "SarahAyman",
        passwordhashed: " pass",
    });
    expect(result).toEqual({
        id: 1,
        firstname: "Sarah",
        lastname: "Ayman",
        username: "SarahAyman",
        passwordhashed: result.passwordhashed,
    });
});
it("index method should return the correct user", async () => {
    const result = await store.index();
    expect(result).toEqual([
        { id: 1, firstname: "Sarah", lastname: "Ayman", username: "SarahAyman", passwordhashed: result[0].passwordhashed }
    ]);
});
it("show method should return the correct user", async () => {
    const result = await store.show("1");
    expect(result).toEqual({
        id: 1,
        firstname: "Sarah",
        lastname: "Ayman",
        username: "SarahAyman",
        passwordhashed: result.passwordhashed,
    });
});
