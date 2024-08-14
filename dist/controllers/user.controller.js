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
    },
    async setProfileName(req, res) {
        const { fname, lname } = req.body;
        const userId = req.user?._id;
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        try {
            const user = await user_model_1.User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            user.fname = fname;
            user.lname = lname;
            await user.save();
            res.status(200).json({ message: 'Profile name updated successfully', user });
        }
        catch (error) {
            res.status(500).json({ error: 'An error occurred while updating the profile name' });
        }
    }
};
