import { Request, Response } from "express"
import { IUser } from "../models/user.model"
import { IWallet, Wallet } from "../models/wallet.model"

declare global {
  namespace Express {
    interface Request {
      user?: IUser
      body: IWallet
    }
  }
}

export default {
  async createWallet(req: Request, res: Response) {
    try {
      const { name, type, balance, note } = req.body
      const userId = req.user?.userId
      const newWallet = await Wallet.create({
        name,
        type,
        balance,
        note,
        userId
      })
      res.status(201).json({
        message: "Create new wallet successfully!",
        wallet: newWallet
      })
    } catch (error) {
      console.error(error)
      res.status(500)
      res.json({ error })
    }
  }
}
