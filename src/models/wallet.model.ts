import mongoose, { Schema, Document, Types } from "mongoose"

export interface IWallet extends Document {
  userId: Types.ObjectId
  name: string
  type: "cash" | "bank" | "mix"
  balance?: number
  transactions: Types.ObjectId[]
  note?: String
  createdAt: Date
  updatedAt: Date
}

const WalletSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ["cash", "bank", "mix"],
    default: "cash",
    required: true
  },
  note: { type: String },
  balance: { type: Number, required: false, default: 0 },
  transactions: [{ type: Schema.Types.ObjectId, ref: "Transaction" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export const Wallet = mongoose.model<IWallet>("Wallet", WalletSchema)
