import express, { Response, Request } from "express";
import jwt, { Secret } from "jsonwebtoken";

import { Product, ProductStore } from "../models/products";

const store = new ProductStore();

const create = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization as unknown as string;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET as Secret);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
  const product: Product = {
    productname: req.body.productname,
    productprice: req.body.productprice,
    productcategory: req.body.productcategory,
  };
  try {
    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json((err as unknown as string) + product);
  }
};
const index = async (req: Request, res: Response) => {
  try {
    const product = await store.index();
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err as unknown as string);
  }
};

const show = async (req: express.Request, res: express.Response) => {
  const product = await store.show(req.params.id);
  res.json(product);
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.params.id);
    res.json("Deleted sucessfully");
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
};

const products_routes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", create);
  app.delete("/products/:id", destroy);
};

export default products_routes;
