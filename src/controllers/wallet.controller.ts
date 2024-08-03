import { Request, Response } from "express"
import { IUser, User } from "../models/user.model"
import { IWallet, Wallet } from "../models/wallet.model"

export default {
  async createWallet(
    req: Request<{ user?: IUser; body: IWallet }>,
    res: Response
  ) {
    try {
      const { name, type, balance, note } = req.body
      const userId = req.user?._id
     

      const newWallet = await Wallet.create({
        userId,
        name,
        type,
        balance,
        note
      })

      await User.findByIdAndUpdate(userId, {
        $push: { wallets: newWallet._id }
      })

      res.status(201).json({
        message: "Create new wallet successfully!",
        wallet: newWallet
      })

    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Internal Server Error" })
    }
  },

  async updateWallet(
    req: Request<{ walletId: string; body: IWallet }>,
    res: Response
  ) {
    try {
      const { walletId } = req.params
      const { name, type, balance, note } = req.body

      const updatedWallet = await Wallet.findByIdAndUpdate(
        walletId,
        { name, type, balance, note },
        { new: true }
      )

      if (!updatedWallet) {
        return res.status(404).json({ error: "Wallet not found" })
      }

      res.status(200).json({
        message: "Update wallet successfully!",
        wallet: updatedWallet
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Internal Server Error" })
    }
  },

  async deleteWallet(req: Request<{ walletId: string }>, res: Response) {
    try {
      const { walletId } = req.params
      const userId = req.user?.userId

      const deletedWallet = await Wallet.findByIdAndDelete(walletId)

      if (!deletedWallet) {
        return res.status(404).json({ error: "Wallet not found" })
      }

      await User.findByIdAndUpdate(userId, {
        $pull: { wallets: walletId }
      })

      res.status(200).json({
        message: "Delete wallet successfully!",
        wallet: deletedWallet
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Internal Server Error" })
    }
  },

  async getWallet(req: Request<{ walletId: string }>, res: Response) {
    try {
      const { walletId } = req.params
      const wallet = await Wallet.findById(walletId)

      if (!wallet) {
        return res.status(404).json({ error: "Wallet not found" })
      }

      res.status(200).json({ wallet })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Internal Server Error" })
    }
  },

  async getAllWallets(req: Request<{ user?: IUser }>, res: Response) {
    try {
      const userId = req.user?.userId
      const wallets = await Wallet.find({ userId })

      res.status(200).json({ wallets })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Internal Server Error" })
    }
  }
}
