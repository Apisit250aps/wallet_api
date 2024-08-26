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

      res.json(user) 
  },
  async setProfileName(req: Request<IUser>, res: Response) {
    const { fname, lname } = req.body;
    const userId = req.user?._id;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.fname = fname;
        user.lname = lname;

        await user.save();

        res.status(200).json({ message: 'Profile name updated successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the profile name' });
    }
}
}
