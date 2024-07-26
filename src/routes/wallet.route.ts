import { Router } from "express"
import { authenticateJWT } from "../middlewares/auth.middleware"
import walletController from "../controllers/wallet.controller"

const wallet = Router()
wallet.use(authenticateJWT)
wallet.post("/create", walletController.createWallet)

export default wallet
