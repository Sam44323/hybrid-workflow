import { Router } from 'express'

const productsRouter = Router()

productsRouter.post('/add')
productsRouter.post('/update')
productsRouter.post('/delete')

export default productsRouter
