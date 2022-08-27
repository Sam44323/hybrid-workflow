import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided.' })
  }
  const parts = authHeader.split(' ')
  if (parts.length !== 2) {
    return res.status(401).json({ message: 'Token error.' })
  }
  const [scheme, token] = parts
  jwt.verify(token, process.env.JWT_SECRET, (err: jwt.VerifyErrors, _) => {
    if (err) {
      return res.status(401).json({ message: 'Token invalid.' })
    }
    next()
  })
}

export default authMiddleware
