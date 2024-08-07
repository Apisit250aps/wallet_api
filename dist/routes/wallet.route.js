"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const wallet_controller_1 = __importDefault(require("../controllers/wallet.controller"));
const wallet = (0, express_1.Router)();
wallet.use(auth_middleware_1.authenticateJWT);
wallet.post("/create", wallet_controller_1.default.createWallet);
wallet.put("/update/:walletId", wallet_controller_1.default.updateWallet);
wallet.delete("/delete/:walletId", wallet_controller_1.default.deleteWallet);
wallet.get("/get/:walletId", wallet_controller_1.default.getWallet);
wallet.get("/all", wallet_controller_1.default.getAllWallets);
exports.default = wallet;
