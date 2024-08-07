import mongoose from "mongoose"
mongoose.set("debug", true)
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://apisit250aps:Phgs5srZYBulqDab@cluster0.jwfno.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000, // เพิ่มเวลา socket timeout
        connectTimeoutMS: 30000 // เพิ่มเวลา connect timeout
      }
    )

    console.log("MongoDB connected")
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

export default connectDB
