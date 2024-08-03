import mongoose, { Schema, Document, Types, ObjectId } from "mongoose"

export interface IUser extends Document {
  userId?: ObjectId
  username: string
  email?: string
  password: String
  isAdmin: Boolean
  wallets: Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: false },
  password: { type: String, required: true },
  wallets: [{ type: Schema.Types.ObjectId, ref: "Wallet" }],
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})


UserSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: new Date() })
  next()
})

UserSchema.pre("updateOne", function (next) {
  this.set({ updatedAt: new Date() })
  next()
})


export const User = mongoose.model<IUser>("User", UserSchema)
