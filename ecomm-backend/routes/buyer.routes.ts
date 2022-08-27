import { Router } from 'express'
import authMiddleware from '../utils/auth.middleware'

const buyerRouter = Router()

buyerRouter.get('/list-of-sellers', authMiddleware)
buyerRouter.post('/seller-catalog/:seller_id', authMiddleware)
buyerRouter.post('/create-order/:seller_id', authMiddleware)

export default buyerRouter
