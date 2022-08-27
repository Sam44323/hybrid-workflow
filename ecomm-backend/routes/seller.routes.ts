import { Router } from 'express'
import authMiddleware from '../utils/auth.middleware'

const productsRouter = Router()

productsRouter.post('/create-catalog', authMiddleware)
productsRouter.post('/orders', authMiddleware)

export default productsRouter
