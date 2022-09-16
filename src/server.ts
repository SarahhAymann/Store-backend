import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import orders_routes from "./handlers/ordersHandler";
import anaylsisRoutes from './handlers/dashboardHandler'

import products_routes from "./handlers/productsHandler";
import users_routes from "./handlers/usersHandler";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});
var corsOptions = {
  origin: "http://example.com",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

users_routes(app);
products_routes(app);
orders_routes(app);
anaylsisRoutes(app);