import { Router } from "express"
import authController from "../controllers/auth.controller"

const auth = Router()

auth.post("/register", authController.userRegister)
auth.post("/login", authController.userLogin)

export default auth
