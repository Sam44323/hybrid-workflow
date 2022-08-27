import { Router } from 'express'
import authMiddleware from '../utils/auth.middleware'
import { getOrders, createCatalog } from '../controllers/seller.controllers'

const productsRouter = Router()

productsRouter.get('/orders', authMiddleware, getOrders)
productsRouter.post('/create-catalog', authMiddleware, createCatalog)

export default productsRouter
