import { Request, Response } from "express"
import { comparePasswords, hashPassword } from "../utils/password"
import { IUser, User } from "../models/user.model"
import { generateToken } from "../utils/jwt"

export default {
  async userRegister(req: Request, res: Response) {
    try {
      const { username, password } = req.body

      const existingUser = await User.findOne({ username: username })
      if (existingUser) {
        return res.status(409).json({ error: "Username already exists" })
      }

      const hashedPassword = await hashPassword(password)
      const newUser = await User.create({
        username: username,
        password: hashedPassword
      })

      return res.status(201).json({ newUser })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error })
    }
  },
  async userLogin(req: Request, res: Response) {
    try {
      const { username, password } = req.body

      const user = await User.findOne({ username })
      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" })
      }

      const isPasswordValid = await comparePasswords(
        password,
        user.password as any
      )

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid username or password" })
      }

      const token = generateToken({ userId: user._id, username: user.username })
      return res.status(200).json({ token })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error })
    }
  },
  async userInformation(req: Request<{ user?: IUser }>, res: Response) {
    const user = await User.findById(req.user?.userId)
      .populate({
        path: 'wallets',
       
      })
      .exec();
      
    res.status(200).json({ id: user })
  }
}
