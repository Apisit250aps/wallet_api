import { Router } from "express"
import authController from "../controllers/auth.controller"
import { authenticateJWT } from "../middlewares/auth.middleware"
import { Request, Response } from "express"
const auth = Router()

auth.post("/register", authController.userRegister)
auth.post("/login", authController.userLogin)

auth.get("/test",authenticateJWT, (req: Request, res: Response) => {
    console.log(req.body)
  res.status(200)
  res.json({message:"hello"})
})
export default auth
