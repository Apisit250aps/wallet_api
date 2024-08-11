"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const password_1 = require("../utils/password");
const user_model_1 = require("../models/user.model");
const jwt_1 = require("../utils/jwt");
exports.default = {
    async userRegister(req, res) {
        try {
            const { username, password } = req.body;
            const existingUser = await user_model_1.User.findOne({ username: username });
            if (existingUser) {
                return res.status(409).json({ error: "Username already exists" });
            }
            const hashedPassword = await (0, password_1.hashPassword)(password);
            const newUser = await user_model_1.User.create({
                username: username,
                password: hashedPassword
            });
            return res.status(201).json({ newUser });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error });
        }
    },
    async userLogin(req, res) {
        try {
            const { username, password } = req.body;
            const user = await user_model_1.User.findOne({ username });
            if (!user) {
                return res.status(401).json({ error: "Invalid username or password" });
            }
            const isPasswordValid = await (0, password_1.comparePasswords)(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: "Invalid username or password" });
            }
            const token = (0, jwt_1.generateToken)({ userId: user._id, username: user.username });
            return res.status(200).json({ token });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error });
        }
    }
};
