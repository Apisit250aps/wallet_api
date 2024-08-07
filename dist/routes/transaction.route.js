"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_controller_1 = __importDefault(require("../controllers/transaction.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const transaction = (0, express_1.Router)();
transaction.use(auth_middleware_1.authenticateJWT);
transaction.post("/:walletId/create", transaction_controller_1.default.createTransaction);
transaction.get("/get/:transactionId", transaction_controller_1.default.getTransaction);
transaction.put("/edit/:transactionId", transaction_controller_1.default.updateTransaction);
transaction.delete("/delete/:walletId/:transactionId", transaction_controller_1.default.deleteTransaction);
exports.default = transaction;
