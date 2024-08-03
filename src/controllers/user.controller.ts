import { Request, Response } from "express"
import { User, IUser } from "../models/user.model"
export default {
  async getUserInformation(req: Request<{ userId: String }>, res: Response) {
    const { userId } = req.params
    const user = await User.findOne({ userId })
      .populate({
        path: "wallets"
      })
      .exec()
  }
}
