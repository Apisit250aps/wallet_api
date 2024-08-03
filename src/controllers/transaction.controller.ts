import { Request, Response } from "express"
import { Transaction, ITransaction } from "../models/transaction.model"
import { IUser } from "../models/user.model"
import { Wallet } from "../models/wallet.model"

export default {
  // สร้างธุรกรรม
  async createTransaction(
    req: Request<{ body: ITransaction; walletId: String; user?: IUser }>,
    res: Response
  ) {
    try {
      const { walletId } = req.params
      const { amount, type, date, note } = req.body
      const userId = req.user?._id as string

      const newTransaction = new Transaction({
        userId,
        walletId,
        amount,
        type,
        date,
        note
      })
      // Save the transaction to the database
      await newTransaction.save()

      await Wallet.findByIdAndUpdate(walletId, {
        $push: { transactions: newTransaction._id }
      })

      res.status(201).json(newTransaction)
    } catch (error) {
      res.status(500).json({ error })
    }
  },

  // ลบธุรกรรม
  async deleteTransaction(
    req: Request<{ transactionId: String; walletId: String }>,
    res: Response
  ) {
    try {
      const { transactionId, walletId } = req.params

      // ตรวจสอบว่า transaction มีอยู่จริงและเป็นของผู้ใช้หรือไม่
      const transaction = await Transaction.findOne({ _id: transactionId, walletId })
      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found or access denied" })
      }

      await Transaction.findByIdAndDelete(transactionId)
      await Wallet.findByIdAndUpdate(walletId, {
        $pull: { transactions: transactionId }
      })

      res.status(200).json({ message: "Transaction deleted successfully" })
    } catch (error) {
      res.status(500).json({ error })
    }
  },

  // อ่านธุรกรรม
  async getTransaction(req: Request<{ transactionId: String }>, res: Response) {
    try {
      const { transactionId } = req.params

      const transaction = await Transaction.findById(transactionId)
      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" })
      }

      res.status(200).json(transaction)
    } catch (error) {
      res.status(500).json({ error })
    }
  },

  // แก้ไขธุรกรรม
  async updateTransaction(
    req: Request<{ transactionId: String; body: Partial<ITransaction> }>,
    res: Response
  ) {
    try {
      const { transactionId } = req.params
      const updateData = req.body

      const updatedTransaction = await Transaction.findByIdAndUpdate(
        transactionId,
        updateData,
        { new: true }
      )
      if (!updatedTransaction) {
        return res.status(404).json({ message: "Transaction not found" })
      }

      res.status(200).json(updatedTransaction)
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}
