import { ObjectId } from "mongodb"

interface UserInterface {
  _id?: ObjectId
  name: string
  email?: string
  password: String
  wallets: ObjectId[]
  createdAt: Date
  updatedAt: Date
}
