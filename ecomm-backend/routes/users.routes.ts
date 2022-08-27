import { Router } from 'express'
import { register, login, test } from '../controllers/users.controllers'

const usersRouter = Router()

usersRouter.get('/test', test)
usersRouter.post('/login', login)
usersRouter.post('/register', register)

export default usersRouter
