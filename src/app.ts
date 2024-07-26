// src/server.ts
import express, { Request, Response } from "express"
import bodyParser from "body-parser"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import authRoute from "./routes/auth"
// define app
const app = express()

// app settings
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan("dev"))
app.use(helmet())

// index route
app.post("/", (req: Request, res: Response) => {
  console.log(req.body)
  res.send("Hello, TypeScript with Express!")
})

app.use("/auth", authRoute)

export default app
