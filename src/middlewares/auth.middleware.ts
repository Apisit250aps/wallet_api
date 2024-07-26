import { Response, NextFunction } from "express"
import { verifyToken } from "../utils/jwt"
import { IUser } from "../models/user.model"

declare global {
  namespace Express {
    interface Request {
      user?: IUser // Add optional user property
      headers: {
        authorization?: String
      }
    }
  }
}

export const authenticateJWT = (
  req: Express.Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(" ")[1] // Assuming the token is in the format "Bearer <token>"

    try {
      const decoded = verifyToken(token) as IUser // Ensure that decoded is of type IUser
      req.user = decoded // Save decoded token information to request object
      next()
    } catch (error) {
      return res.status(403).json({ error: "Forbidden" })
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" })
  }
}
