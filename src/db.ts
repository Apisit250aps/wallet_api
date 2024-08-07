import mongoose from "mongoose"

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://apisit:jUS_XYN3Eg#va!f@cluster0.jwfno.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      // {
      //   serverSelectionTimeoutMS: 60000 // Increase timeout (in milliseconds)
      // }
    )

    console.log("MongoDB connected")
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

export default connectDB
