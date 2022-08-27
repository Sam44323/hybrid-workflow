import { Router } from 'express'
import authMiddleware from '../utils/auth.middleware'

const usersRouter = Router()

usersRouter.post('/login')
usersRouter.post('/signup/:type')
usersRouter.post('/update', authMiddleware)
usersRouter.post('/delete', authMiddleware)

export default usersRouter
