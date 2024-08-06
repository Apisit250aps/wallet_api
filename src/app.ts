// src/server.ts
import express, { Request, Response } from "express"
import bodyParser from "body-parser"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import auth from "./routes/auth.route"
import wallet from "./routes/wallet.route"
import transaction from "./routes/transaction.route"
import tag from "./routes/tag.route"

// define app
const app = express()

// app settings
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan("dev"))
app.use(helmet())

// index route
app.get("/", (req: Request, res: Response) => {
  console.log(req.body)
  res.send("Hello, TypeScript with Express!")
})

app.use("/auth", auth)
app.use("/wallet", wallet)
app.use("/transaction", transaction)
app.use("/tag", tag)
//
export default app
