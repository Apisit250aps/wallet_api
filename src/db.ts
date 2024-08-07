import mongoose from "mongoose"
mongoose.set("debug", true)
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://apisit250aps:Phgs5srZYBulqDab@cluster0.jwfno.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        
       
        socketTimeoutMS: 45000,
        connectTimeoutMS: 30000,
        autoIndex: false, // เพิ่มการตั้งค่านี้หากจำเป็น
      }
    )

    console.log("MongoDB connected")
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

export default connectDB
