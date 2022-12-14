import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import mongoose from 'mongoose'
import Logger from './utils/logger'

// routes
import userRouter from './routes/users.routes'
import buyerRouter from './routes/buyer.routes'
import sellerRouter from './routes/seller.routes'

dotenv.config()

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())

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

app.use('/api/users', userRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/buyer', buyerRouter)

const port = process.env.PORT || 3001
app.listen(port, () => {
  Logger.info(`✅ Backend is running on PORT: ${port}`)
})
