import express, { Response, Request } from "express";
import { Order, OrderStore, ProductsodOrder } from "../models/orders";

const store = new OrderStore();

const create = async (req: Request, res: Response) => {
  const order: Order = {
    order_status: req.body.orderstatus,
    user_id: req.body.user_id,
  };
  try {
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json((err as unknown as string) + order);
  }
};
const index = async (req: Request, res: Response) => {
  try {
    const order = await store.index();
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err as unknown as string);
  }
};

const show = async (req: express.Request, res: express.Response) => {
  const order = await store.show(req.params.id);
  res.json(order);
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

const addProductsToOrders = async (req: Request, res: Response) => {
   const orderID: string = req.params.id;
   const quantity:number = parseInt(req.body.quantity);
   const productsID: string =req.body.productsID;
  

  try {
    const addedProduct = await store.addProdtuctsToOrder(quantity, orderID, productsID
    );
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const viewAllOrdersWithProducts = async (req: Request, res: Response) => {
  try {
    const orderID: string = req.params.id;
    const orderWithProducts = await store.ViewallOrders(orderID);
    res.json(orderWithProducts);
  } catch (err) {
    res.status(400);
    res.json(err as unknown as string);
  }
};

const showAnOrderWithProducts = async (
  req: express.Request,
  res: express.Response
) => {
  const order = await store.showAnOrder(req.params.id);
  res.json(order);
};

const orders_routes = (app: express.Application) => {
  app.get("/orders", index);
  app.get("/orders/:id", show);
  app.post("/orders", create);
  app.delete("/orders/:id", destroy);
  app.post("/orders/:id/products", addProductsToOrders);
  app.get("/orders/:id/products", viewAllOrdersWithProducts);
  app.get("/orders/:id/products/:id", showAnOrderWithProducts);
};

export default orders_routes;
