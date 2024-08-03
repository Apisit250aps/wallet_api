import mongoose, { Schema, Document, Types } from "mongoose"

export interface ITransaction extends Document {
  userId: Types.ObjectId
  walletId: Types.ObjectId
  amount: number
  type?: "income" | "expense"
  date?: Date
  tags?: Types.ObjectId[]
  note?: string
  createdAt: Date
  updatedAt: Date
}

const TransactionSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", require: true },
  walletId: { type: Schema.Types.ObjectId, ref: "Wallet", required: true },
  amount: { type: Number, required: true },
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true,
    default: "income"
  },
  date: { type: Date, required: false, default: Date.now },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  note: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

TransactionSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: new Date() })
  next()
})

TransactionSchema.pre("updateOne", function (next) {
  this.set({ updatedAt: new Date() })
  next()
})

export const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  TransactionSchema
)
