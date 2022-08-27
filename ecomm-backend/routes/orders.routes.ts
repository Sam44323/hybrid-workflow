import { Router } from 'express'
import authMiddleware from '../utils/auth.middleware'

const ordersRouter = Router()

ordersRouter.post('/add', authMiddleware)
ordersRouter.post('/update', authMiddleware)
ordersRouter.post('/delete', authMiddleware)

export default ordersRouter
