import { Router } from 'express'

const usersRouter = Router()

usersRouter.post('/login')
usersRouter.post('/signup/:type')
usersRouter.post('/update')
usersRouter.post('/delete')

export default usersRouter
