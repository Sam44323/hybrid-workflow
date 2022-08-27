import { Router } from 'express'

const ordersRouter = Router()

ordersRouter.post('/add')
ordersRouter.post('/update')
ordersRouter.post('/delete')

export default ordersRouter
