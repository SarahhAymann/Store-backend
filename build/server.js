"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const ordersHandler_1 = __importDefault(require("./handlers/ordersHandler"));
const dashboardHandler_1 = __importDefault(require("./handlers/dashboardHandler"));
const productsHandler_1 = __importDefault(require("./handlers/productsHandler"));
const usersHandler_1 = __importDefault(require("./handlers/usersHandler"));
const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
app.use(body_parser_1.default.json());
app.get("/", function (req, res) {
    res.send("Hello World!");
});
var corsOptions = {
    origin: "http://example.com",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use((0, cors_1.default)(corsOptions));
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
(0, usersHandler_1.default)(app);
(0, productsHandler_1.default)(app);
(0, ordersHandler_1.default)(app);
(0, dashboardHandler_1.default)(app);
