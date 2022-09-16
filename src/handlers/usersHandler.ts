import express, { Response, Request } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { User, UserStore } from "../models/users";
const store = new UserStore();

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
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    passwordhashed: req.body.password,
  };
  try {
    const newUser = await store.create(user);
    res.json(newUser);
  } catch (err) {
    res.status(400);
    res.json((err as unknown as string) + user);
  }
};

const index = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization as unknown as string;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET as Secret);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err as unknown as string);
  }
};

const show = async (req: express.Request, res: express.Response) => {
  try {
    const authorizationHeader = req.headers.authorization as unknown as string;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET as Secret);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
  const users = await store.show(req.params.id);
  res.json(users);
};

const destroy = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization as unknown as string;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET as Secret);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
  try {
    const deleted = await store.delete(req.params.id);
    res.json("Deleted sucessfully");
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
};

const login = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    passwordhashed: req.body.password,
  };
  console.log(user);

  try {
    const u = await store.login(user);
    console.log(u);

    var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as Secret);
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};

const users_routes = (app: express.Application) => {
  app.get("/users", index);
  app.get("/users/:id", show);
  app.post("/users", create);
  app.post("/login", login);

  app.delete("/users/:id", destroy);
};

export default users_routes;
