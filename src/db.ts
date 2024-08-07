import mongoose from "mongoose"

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://apisit250aps:Phgs5srZYBulqDab@cluster0.jwfno.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        serverSelectionTimeoutMS: 30000, 
      }
    )

    console.log("MongoDB connected")
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

export default connectDB
