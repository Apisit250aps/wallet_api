"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const wallet_route_1 = __importDefault(require("./routes/wallet.route"));
const transaction_route_1 = __importDefault(require("./routes/transaction.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
// define app
const app = (0, express_1.default)();
// app settings
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use((0, helmet_1.default)());
// index route
app.get("/", (req, res) => {
    console.log(req.body);
    res.send("Hello, TypeScript with Express!");
});
app.use("/auth", auth_route_1.default);
app.use("/user", user_route_1.default);
app.use("/wallet", wallet_route_1.default);
app.use("/transaction", transaction_route_1.default);
//
exports.default = app;
