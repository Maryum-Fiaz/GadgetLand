import express from 'express'
import dotenv from 'dotenv'
const app = express()
import { connectDatabase } from './config/dbConnect.js'
import errorMiddleware from './middleware/error.js'

dotenv.config({path: 'backend/config/config.env'})

// Database connection
connectDatabase()

app.use(express.json());

// Import all Routes
import productRoutes from './routes/products.js'
app.use('/api/v1', productRoutes)

// Using error middleware
app.use(errorMiddleware)


app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})