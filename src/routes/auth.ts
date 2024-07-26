import { Router, Request, Response } from "express"

const authRoute = Router()
authRoute.get("/test", (req: Request, res: Response) => {
  res.json({
    message: "hello world"
  })
})

export default authRoute
