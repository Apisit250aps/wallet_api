"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
exports.default = {
    async getUserInformation(req, res) {
        const { userId } = req.params;
        const user = await user_model_1.User.findOne({ userId })
            .populate({
            path: "wallets"
        })
            .exec();
    }
};
