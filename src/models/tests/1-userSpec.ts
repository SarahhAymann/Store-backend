import { User, UserStore } from "../users";
import bcrypt from "bcrypt";
const saltRounds = process.env.SALT_ROUNDS as unknown as string;
const peper = process.env.BCRYPT_PASSWORD;
const store = new UserStore();

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
    { id: 1, firstname: "Sarah", lastname: "Ayman", username: "SarahAyman", passwordhashed :result[0].passwordhashed}
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
