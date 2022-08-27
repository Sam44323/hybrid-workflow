import { Router } from 'express'
import authMiddleware from '../utils/auth.middleware'

import {
  getSellersList,
  createOrder,
  getSellerCatalogue
} from '../controllers/buyer.controllers'

const buyerRouter = Router()

buyerRouter.get('/list-of-sellers', authMiddleware, getSellersList)
buyerRouter.post(
  '/seller-catalog/:seller_id',
  authMiddleware,
  getSellerCatalogue
)
buyerRouter.post('/create-order/:seller_id', authMiddleware, createOrder)

export default buyerRouter
