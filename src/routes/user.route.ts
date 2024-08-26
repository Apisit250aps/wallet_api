import { Router } from "express";
import userController from "../controllers/user.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";

const user = Router()
user.use(authenticateJWT)
user.post('/set/profile', userController.setProfileName)
user.get('/information', userController.getUserInformation)
export default user