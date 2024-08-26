"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const user = (0, express_1.Router)();
user.use(auth_middleware_1.authenticateJWT);
user.post('/set/profile', user_controller_1.default.setProfileName);
user.get('/information', user_controller_1.default.getUserInformation);
exports.default = user;
