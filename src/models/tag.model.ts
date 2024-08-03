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

TagSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: new Date() })
  next()
})

TagSchema.pre("updateOne", function (next) {
  this.set({ updatedAt: new Date() })
  next()
})

export const Tag = mongoose.model<ITag>("Tag", TagSchema)
