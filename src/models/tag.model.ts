import mongoose, { Schema, Document, Types } from "mongoose"

export interface ITag extends Document {
  name: string
  createdAt: Date
  updatedAt: Date
}

const TagSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export const Tag = mongoose.model<ITag>("Tag", TagSchema)
