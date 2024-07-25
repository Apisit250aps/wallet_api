import mongoose, { Schema, Document, Types } from "mongoose"

export interface IUser extends Document {
  name: string
  email: string
  wallets: Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

export interface IWallet extends Document {
  userId: Types.ObjectId
  name: string
  type: "เงินสด" | "เงินธนาคาร" | "รวมทั้งหมด"
  balance: number
  transactions: Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

export interface ITransaction extends Document {
  walletId: Types.ObjectId
  amount: number
  type: "รายรับ" | "รายจ่าย"
  category: "รายรับ" | "รายจ่าย"
  date: Date
  tags: Types.ObjectId[]
  note?: string
  createdAt: Date
  updatedAt: Date
}

export interface ITag extends Document {
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface ITransactionTag extends Document {
  transactionId: Types.ObjectId
  tagId: Types.ObjectId
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

const WalletSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ["เงินสด", "เงินธนาคาร", "รวมทั้งหมด"],
    required: true
  },
  balance: { type: Number, required: true },
  transactions: [{ type: Schema.Types.ObjectId, ref: "Transaction" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const TransactionSchema: Schema = new Schema({
  walletId: { type: Schema.Types.ObjectId, ref: "Wallet", required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["รายรับ", "รายจ่าย"], required: true },
  category: { type: String, enum: ["รายรับ", "รายจ่าย"], required: true },
  date: { type: Date, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  note: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const TagSchema: Schema = new Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const TransactionTagSchema: Schema = new Schema({
  transactionId: {
    type: Schema.Types.ObjectId,
    ref: "Transaction",
    required: true
  },
  tagId: { type: Schema.Types.ObjectId, ref: "Tag", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export const User = mongoose.model<IUser>("User", UserSchema)
export const Wallet = mongoose.model<IWallet>("Wallet", WalletSchema)
export const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  TransactionSchema
)
export const Tag = mongoose.model<ITag>("Tag", TagSchema)
export const TransactionTag = mongoose.model<ITransactionTag>(
  "TransactionTag",
  TransactionTagSchema
)
