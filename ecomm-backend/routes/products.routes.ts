import { Router } from 'express'
import authMiddleware from '../utils/auth.middleware'

const productsRouter = Router()

productsRouter.post('/add', authMiddleware)
productsRouter.post('/update', authMiddleware)
productsRouter.post('/delete', authMiddleware)

export default productsRouter
