import { Router } from 'express'
import authMiddleware from '../utils/auth.middleware'

const usersRouter = Router()

usersRouter.post('/login')
usersRouter.post('/register')

export default usersRouter
