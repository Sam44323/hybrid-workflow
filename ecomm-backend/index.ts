import express, { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import mongoose from 'mongoose'
import Logger from './utils/logger'

// routes
import userRouter from './routes/users.routes'
import ordersRouter from './routes/orders.routes'
import productRouter from './routes/products.routes'

dotenv.config()

mongoose.connect(process.env.MONGO_URI, {
  // @ts-ignore
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const connection = mongoose.connection // connection from mongoose
// Once connection established
connection.once('open', () => {
  Logger.info('✅ MongoDB connection established successfully!')
})

// If error while connection
connection.on('error', (err: any) => {
  Logger.info('❌ Failed to connect to DB on startup ' + err.message)
})
// When the connection is disconnected
connection.on('disconnected', () => {
  Logger.info('🔌 Mongoose default connection to DB disconnected')
})

const app = express()
app.use(cors)
app.use(helmet())

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', ordersRouter)

app.use(
  (
    error: { code: any; message: any },
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    Logger.info(`
    [${new Date().toLocaleString()}] : ❌ Error`)
    if (res.headersSent) {
      return next(error)
    }
    if (res.headersSent) {
      return
    }
    res.status(error.code || 500)
    res.json({ message: error.message || 'An unknown error occurred!' })
  }
)

const port = process.env.PORT || 3001
app.listen(port, () => {
  Logger.info(`✅ Backend is running on PORT: ${port}`)
})
