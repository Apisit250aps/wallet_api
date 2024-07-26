import { Router } from "express"
import { authenticateJWT } from "../middlewares/auth.middleware"
import walletController from "../controllers/wallet.controller"

const wallet = Router()
wallet.use(authenticateJWT)

wallet.post("/create", walletController.createWallet)
wallet.put("/update/:walletId", walletController.updateWallet)
wallet.delete("/delete/:walletId", walletController.deleteWallet)
wallet.get("/get/:walletId", walletController.getWallet)
wallet.get("/all", walletController.getAllWallets)

export default wallet
