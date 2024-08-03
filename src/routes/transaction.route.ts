import { Router } from "express"
import transactionController from "../controllers/transaction.controller"
import { authenticateJWT } from "../middlewares/auth.middleware"

const transaction = Router()

transaction.use(authenticateJWT)
transaction.post("/:walletId/create", transactionController.createTransaction)
transaction.get("/get/:transactionId", transactionController.getTransaction)
transaction.put("/edit/:transactionId", transactionController.updateTransaction)
transaction.delete(
  "/delete/:walletId/:transactionId",
  transactionController.deleteTransaction
)

export default transaction
