import mongoose, { Schema, Document, Types } from "mongoose"

export interface IUser extends Document {
  name: string
  email: string
  wallets: Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  wallets: [{ type: Schema.Types.ObjectId, ref: "Wallet" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export const User = mongoose.model<IUser>("User", UserSchema)
