import mongoose, { Schema, Document, Types } from "mongoose"

export interface ITransactionTag extends Document {
  transactionId: Types.ObjectId
  tagId: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

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

export const TransactionTag = mongoose.model<ITransactionTag>(
  "TransactionTag",
  TransactionTagSchema
)
