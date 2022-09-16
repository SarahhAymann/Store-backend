import express, { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";

import { AnalysisClass } from "../services/dashborad";

const anaylsis = new AnalysisClass();

const Top5products = async (_req: Request, res: Response) => {
  const products = await anaylsis.Top5products();
  res.json(products);
};

const productsBycategory = async (_req: Request, res: Response) => {
  const productCategory = _req.body.productcategory;
  const products = await anaylsis.productsByCategoreies(productCategory);

  res.json(products);
};

const currentOrderByuser = async (_req: Request, res: Response) => {
  try {
    const authorizationHeader = _req.headers.authorization as unknown as string;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET as Secret);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
  const user_id = _req.params.user_id;

  const orders = await anaylsis.currentOrderByUser(user_id);

  res.json(orders);
};
const completeOrderByuser = async (_req: Request, res: Response) => {
  try {
    const authorizationHeader = _req.headers.authorization as unknown as string;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET as Secret);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
    const user_id = parseInt(_req.params.user_id);
      const orders = await anaylsis.completedOrdersByuser(user_id);

  res.json(orders);
};

const anaylsisRoutes = (app:express.Application) => {
    app.get("/Top5products",Top5products);
    app.get("/productsBycategory",productsBycategory);
    app.get("/currentOrderByuser/:user_id",currentOrderByuser);
    app.get("/completeOrderByuser/:user_id",completeOrderByuser);
}
export default anaylsisRoutes;
