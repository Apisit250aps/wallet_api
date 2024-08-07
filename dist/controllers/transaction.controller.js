"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_model_1 = require("../models/transaction.model");
const wallet_model_1 = require("../models/wallet.model");
exports.default = {
    // สร้างธุรกรรม
    async createTransaction(req, res) {
        try {
            const { walletId } = req.params;
            const { amount, type, date, note } = req.body;
            const userId = req.user?._id;
            const newTransaction = new transaction_model_1.Transaction({
                userId,
                walletId,
                amount,
                type,
                date,
                note
            });
            // Save the transaction to the database
            await newTransaction.save();
            await wallet_model_1.Wallet.findByIdAndUpdate(walletId, {
                $push: { transactions: newTransaction._id }
            });
            res.status(201).json(newTransaction);
        }
        catch (error) {
            res.status(500).json({ error });
        }
    },
    // ลบธุรกรรม
    async deleteTransaction(req, res) {
        try {
            const { transactionId, walletId } = req.params;
            // ตรวจสอบว่า transaction มีอยู่จริงและเป็นของผู้ใช้หรือไม่
            const transaction = await transaction_model_1.Transaction.findOne({ _id: transactionId, walletId });
            if (!transaction) {
                return res.status(404).json({ message: "Transaction not found or access denied" });
            }
            await transaction_model_1.Transaction.findByIdAndDelete(transactionId);
            await wallet_model_1.Wallet.findByIdAndUpdate(walletId, {
                $pull: { transactions: transactionId }
            });
            res.status(200).json({ message: "Transaction deleted successfully" });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    },
    // อ่านธุรกรรม
    async getTransaction(req, res) {
        try {
            const { transactionId } = req.params;
            const transaction = await transaction_model_1.Transaction.findById(transactionId);
            if (!transaction) {
                return res.status(404).json({ message: "Transaction not found" });
            }
            res.status(200).json(transaction);
        }
        catch (error) {
            res.status(500).json({ error });
        }
    },
    // แก้ไขธุรกรรม
    async updateTransaction(req, res) {
        try {
            const { transactionId } = req.params;
            const updateData = req.body;
            const updatedTransaction = await transaction_model_1.Transaction.findByIdAndUpdate(transactionId, updateData, { new: true });
            if (!updatedTransaction) {
                return res.status(404).json({ message: "Transaction not found" });
            }
            res.status(200).json(updatedTransaction);
        }
        catch (error) {
            res.status(500).json({ error });
        }
    }
};
