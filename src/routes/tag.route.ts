import { Router } from "express"
import tagController from "../controllers/tag.controller"

const tag = Router()

tag.post("/create", tagController.createTag)
tag.get("/all", tagController.getAllTags)
export default tag
