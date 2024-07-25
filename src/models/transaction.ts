import mongoose, { Schema, Document, Types } from "mongoose"

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

export const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  TransactionSchema
)
