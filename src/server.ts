import app from "./app"
import connectDB from "./models/db"

const port = process.env.PORT || 3000

app.listen(port, () => {
  connectDB()
  console.log(`Server is running at http://localhost:${port}`)
})
