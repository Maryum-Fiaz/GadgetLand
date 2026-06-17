import express from 'express'
import dotenv from 'dotenv'
const app = express()
import cookieParser from 'cookie-parser'
import { connectDatabase } from './config/dbConnect.js'
import errorMiddleware from './middleware/error.js'

// Handle uncaught exception
process.on('uncaughtException', (err) => {
    console.log(`ERROR: ${err}`);
    console.log('Shutting down server due to uncaught exception');
    process.exit(1);
})

dotenv.config({path: 'backend/config/config.env'})

// Database connection
connectDatabase()

app.set('query parser', 'extended');
app.use(express.json({ limit: "10mb" }));

app.use(cookieParser());


// Import all Routes
import productRoutes from './routes/products.js'
import authRoutes from './routes/auth.js'
import orderRoutes from './routes/order.js'
import paymentRoutes from './routes/order.js'



app.use('/api/v1', productRoutes)
app.use('/api/v1', authRoutes)
app.use('/api/v1', orderRoutes)
app.use("/api/v1", paymentRoutes);

// Using error middleware
app.use(errorMiddleware)


const server = app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})

// Handle Unhandled promise rejection (async error)
process.on('unhandledRejection', (err) => {
    console.log(`ERROR: ${err}`);
    console.log('Shutting down server due to unhandled Promise Rejection');
    server.close(()=>{
        process.exit(1);
    });     // server shut down
})