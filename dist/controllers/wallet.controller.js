"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
const wallet_model_1 = require("../models/wallet.model");
exports.default = {
    async createWallet(req, res) {
        try {
            const { name, type, balance, note } = req.body;
            const userId = req.user?._id;
            const newWallet = await wallet_model_1.Wallet.create({
                userId,
                name,
                type,
                balance,
                note
            });
            await user_model_1.User.findByIdAndUpdate(userId, {
                $push: { wallets: newWallet._id }
            });
            res.status(201).json({
                message: "Create new wallet successfully!",
                wallet: newWallet
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    async updateWallet(req, res) {
        try {
            const { walletId } = req.params;
            const { name, type, balance, note } = req.body;
            const updatedWallet = await wallet_model_1.Wallet.findByIdAndUpdate(walletId, { name, type, balance, note }, { new: true });
            if (!updatedWallet) {
                return res.status(404).json({ error: "Wallet not found" });
            }
            res.status(200).json({
                message: "Update wallet successfully!",
                wallet: updatedWallet
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    async deleteWallet(req, res) {
        try {
            const { walletId } = req.params;
            const userId = req.user?.userId;
            const deletedWallet = await wallet_model_1.Wallet.findByIdAndDelete(walletId);
            if (!deletedWallet) {
                return res.status(404).json({ error: "Wallet not found" });
            }
            await user_model_1.User.findByIdAndUpdate(userId, {
                $pull: { wallets: walletId }
            });
            res.status(200).json({
                message: "Delete wallet successfully!",
                wallet: deletedWallet
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    async getWallet(req, res) {
        try {
            const { walletId } = req.params;
            const wallet = await wallet_model_1.Wallet.findById(walletId);
            if (!wallet) {
                return res.status(404).json({ error: "Wallet not found" });
            }
            res.status(200).json({ wallet });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    async getAllWallets(req, res) {
        try {
            const userId = req.user?.userId;
            const wallets = await wallet_model_1.Wallet.find({ userId });
            res.status(200).json({ wallets });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};
